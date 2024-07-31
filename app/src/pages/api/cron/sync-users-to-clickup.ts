/* eslint-disable max-lines */
import { db } from "@/db/connection";
import { type User } from "@/db/schema";
import { env } from "@/env.mjs";
import { createClickupTask } from "@/lib/clickup/tasks/create-task";
import { deleteClickupCustomFieldValue } from "@/lib/clickup/tasks/delete-custom-field-value";
import { updateClickupCustomField } from "@/lib/clickup/tasks/update-custom-field";
import { updateClickupTask } from "@/lib/clickup/tasks/update-task";
import { type ClickupTask } from "@/lib/clickup/types";
import { clickupCrmCustomField, clickupRequestConfig, getUserCrmData } from "@/lib/clickup/utils";
import { stripe } from "@/lib/stripe";
import { sleep } from "@/utils/utils";

import { createPagesServerClient, type SupabaseClient } from "@supabase/auth-helpers-nextjs";
import axios, { AxiosError, type AxiosResponse } from "axios";
import type { NextApiHandler } from "next";
import pLimit from "p-limit";
import type Stripe from "stripe";

const stripeConcurrencyLimit = pLimit(env.STRIPE_SDK_CONCURRENCY_LIMIT);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const printAllSettledPromisesSummary = (settledPromises: Array<PromiseSettledResult<unknown>>, actionName: string): void =>
{
  const failedPromises = settledPromises.filter((result): result is PromiseRejectedResult => result.status === "rejected");
  const successfulPromises = settledPromises.filter((result): result is PromiseFulfilledResult<AxiosResponse> => result.status === "fulfilled");

  const errors = failedPromises.map((failedPromise) =>
  {
    const error = failedPromise.reason;

    if(error instanceof AxiosError)
    {
      console.error(`Error while task'${actionName}' - ${error.response?.status} (${error.response?.statusText}). Response:`, error.response?.data);
      return error.response;
    }
    else
    {
      console.error(`Error while task '${actionName}':`, error);
      return error;
    }
  });

  console.info(`Task '${actionName}' finished. Results: ${successfulPromises.length} successful promises, ${failedPromises.length} failed promises`);

  if(failedPromises.length > 0)
  {
    console.error(`At least task of action '${actionName}' failed`, errors);
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getCrmDataForUser = async (user: User, supabaseServerClient: SupabaseClient<never, "public", never>) =>
{
  const { data: { user: supabaseUserData } } = await supabaseServerClient.auth.admin.getUserById(user.id);

  if(!supabaseUserData)
  {
    return null;
  }

  const userSubscriptionId = user.subscriptionId;
  let subscriptionData: Stripe.Response<Stripe.Subscription> | null = null;

  if(userSubscriptionId != null)
  {
    console.log(`Fetching subscription data for user ${user.id}...`);
    subscriptionData = await stripe.subscriptions.retrieve(userSubscriptionId);
  }

  const crmData = getUserCrmData({
    subscriptionData,
    supabaseUserData,
    user
  });

  return ({
    crmData,
    userData: user
  });
};

export const getUpdateUsersCrmDataPromises = ({
  existingCrmUser,
  userWithCrmData
}: {
  existingCrmUser: ClickupTask;
  userWithCrmData: NonNullable<Awaited<ReturnType<typeof getCrmDataForUser>>>;
}) => // eslint-disable-line @typescript-eslint/explicit-function-return-type
{
  const updateUsersPromises: Array<Promise<AxiosResponse>> = [];

  const { crmData, userData } = userWithCrmData;

  if(existingCrmUser.name !== (userData.firstName + " " + userData.lastName))
  {
    updateUsersPromises.push(updateClickupTask(existingCrmUser.id!, { name: userData.firstName + " " + userData.lastName }));
  }

  crmData.custom_fields.forEach((field) =>
  {
    if(field.id === clickupCrmCustomField.category.fieldId)
    {
      // Skip category field because it's not supposed to be updated automatically after creation
      return;
    }

    const existingCrmField = existingCrmUser.custom_fields?.find((existingField) => existingField.id === field.id);

    if(!existingCrmField)
    {
      updateUsersPromises.push(updateClickupCustomField({
        taskId: existingCrmUser.id,
        updatedCustomField: field
      }));
      return;
    }

    switch (existingCrmField.type)
    {
      case "drop_down":
      {
        const currentlySelectedOption = existingCrmField.value != null ? existingCrmField.type_config.options[existingCrmField.value] : null;
        const currentlySelectedOptionId = currentlySelectedOption?.id;

        if(field.value == null && currentlySelectedOptionId != null)
        {
          updateUsersPromises.push(deleteClickupCustomFieldValue({
            fieldId: field.id,
            taskId: existingCrmUser.id
          }));
        }
        else if(currentlySelectedOptionId !== field.value)
        {
          updateUsersPromises.push(updateClickupCustomField({
            taskId: existingCrmUser.id,
            updatedCustomField: field
          }));
        }
        break;
      }
      case "number":
      case "date":
      {
        if(field.value == null && existingCrmField.value != null)
        {
          updateUsersPromises.push(deleteClickupCustomFieldValue({
            fieldId: field.id,
            taskId: existingCrmUser.id
          }));
        }
        else if(field.value != null && Number(existingCrmField.value) !== field.value)
        {
          updateUsersPromises.push(updateClickupCustomField({
            taskId: existingCrmUser.id,
            updatedCustomField: field
          }));
        }
        break;
      }
      case "email":
      {
        if(existingCrmField.value !== field.value)
        {
          updateUsersPromises.push(updateClickupCustomField({
            taskId: existingCrmUser.id,
            updatedCustomField: field
          }));
        }
        break;
      }
    }
  });

  return updateUsersPromises;
};

const handler: NextApiHandler = async (req, res): Promise<void> =>
{
  // TODO: This is not used anymore, remove it later if it's not needed

  if(req.headers.authorization !== `Bearer ${env.CRON_SECRET}`)
  {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if(env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT !== "production" && env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT !== "development")
  {
    console.log("Skipping cronjob in non-production or non-development environment");
    return res.status(200).json({ message: "Skipped in non-production or non-development environment" });
  }

  return res.status(400).json({ message: "Not implemented" });

  console.log("----- [Cronjob] Sync Users to Clickup -----");

  const supabaseServerClient = createPagesServerClient({ req, res }, {
    supabaseKey: env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL
  });

  const allExistingCrmUsers: Array<{
    email: Nullable<unknown>;
    name: string;
    userId: Nullable<unknown>;
  }> = [];

  let hasMore: boolean;
  let page = 0;

  do
  {
    console.log(`Fetching CRM users page ${page}...`);
    const getUsersResult = await axios.get(`${env.CLICKUP_API_ENDPOINT}/list/${env.CLICKUP_CRM_LIST_ID}/task?page=${page}`, clickupRequestConfig);
    const fetchedUsers = getUsersResult.data.tasks as ClickupTask[];
    console.log("getUsersResult", getUsersResult.data, getUsersResult.data.last_page, fetchedUsers.length);
    allExistingCrmUsers.push(...fetchedUsers.map(task => ({
      email: task.custom_fields?.find(field => field.id === clickupCrmCustomField.email.fieldId)?.value,
      name: task.name,
      userId: task.custom_fields?.find(field => field.id === clickupCrmCustomField.userId.fieldId)?.value
    })));
    hasMore = !getUsersResult.data.last_page;

    if(hasMore)
    {
      page++;
    }
  }
  while(hasMore);

  console.log("fetched " + allExistingCrmUsers.length + " customers");

  return res.status(200).json(allExistingCrmUsers);

  const allUsers = await db.query.users.findMany();

  // Comment this in if you want to delete all users in the CRM list

  // This does not fetch all tasks/customers since the ClickUp API only returns a maximum of 100 tasks per request. Pagination is not implemented yet.
  // const existingCrmUsers = await axios.get(`${env.CLICKUP_API_ENDPOINT}/list/${env.CLICKUP_CRM_LIST_ID}/task`, clickupRequestConfig);
  // const deleteUsersPromises = existingCrmUsers.data.tasks
  //   .map(async (task: ClickupTask) => stripeConcurrencyLimit(async () =>
  //   {
  //     console.log(`Deleting user ${task.id}...`);
  //     return axios.delete(`${env.CLICKUP_API_ENDPOINT}/task/${task.id}`, clickupRequestConfig);
  //   }))
  //   .filter(Boolean);
  //
  // await Promise.allSettled(deleteUsersPromises);
  //
  // return res.status(200).json({ message: "Finished", ...existingCrmUsers.data });

  const getCrmDataForAllUsersPromises = allUsers
    .map(async user => stripeConcurrencyLimit(async () => getCrmDataForUser(user, supabaseServerClient)))
    .filter(Boolean);
  const newUsers = (await Promise.all(getCrmDataForAllUsersPromises)).filter(Boolean);

  console.log(`Fetched ${newUsers.length} new users`);

  for(let i = 0; i < newUsers.length; i++)
  {
    const user = newUsers[i]!;
    await createClickupTask(env.CLICKUP_CRM_LIST_ID, user.crmData);

    console.log(`Created new user ${i + 1} - ${user.crmData.name}`);

    if(i % 90 === 0 && i !== 0)
    {
      console.log(`Created ${i} new users - Pause`);
      await sleep(61000);
    }
  }

  for(let i = 0; i < newUsers.length; i++)
  {
    const user = newUsers[i]!;
    await createClickupTask(env.CLICKUP_CRM_LIST_ID, user.crmData);

    if(i % 50 === 0)
    {
      console.log(`Created ${i} new users - Pause`);
      await sleep(61000);
    }
  }

  const createNewUsersResults = await Promise.allSettled(newUsers.map(async ({ crmData }) => createClickupTask(env.CLICKUP_CRM_LIST_ID, crmData)));

  return res.status(200).json({ message: "Finished" });
};

export default handler;
