/* eslint-disable max-lines */
import { db } from "@/db/connection";
import { env } from "@/env.mjs";
import { createClickupTask } from "@/lib/clickup/tasks/create-task";
import { deleteClickupCustomFieldValue } from "@/lib/clickup/tasks/delete-custom-field-value";
import { updateClickupCustomField } from "@/lib/clickup/tasks/update-custom-field";
import { updateClickupTask } from "@/lib/clickup/tasks/update-task";
import { type ClickupTask } from "@/lib/clickup/types";
import { clickupCrmCustomField, clickupRequestConfig, getUserCrmData } from "@/lib/clickup/utils";
import { stripe } from "@/lib/stripe";

import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import axios, { AxiosError, type AxiosResponse } from "axios";
import type { NextApiHandler } from "next";
import pLimit from "p-limit";
import type Stripe from "stripe";

const stripeConcurrencyLimit = pLimit(env.STRIPE_SDK_CONCURRENCY_LIMIT);

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

const handler: NextApiHandler = async (req, res): Promise<void> =>
{
  if(req.headers.authorization !== `Bearer ${env.CRON_SECRET}`)
  {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if(env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT !== "production" && env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT !== "development")
  {
    console.log("Skipping cronjob in non-production or non-development environment");
    return res.status(200).json({ message: "Skipped in non-production or non-development environment" });
  }

  console.log("----- [Cronjob] Sync Users to Clickup -----");

  const supabaseServerClient = createPagesServerClient({ req, res }, {
    supabaseKey: env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL
  });

  const allUsers = await db.query.users.findMany();

  // TODO: This does not fetch all tasks/customers since the ClickUp API only returns a maximum of 100 tasks per request. Pagination is not implemented yet.
  const existingCrmUsers = await axios.get(`${env.CLICKUP_API_ENDPOINT}/list/${env.CLICKUP_CRM_LIST_ID}/task`, clickupRequestConfig);

  // Comment this in if you want to delete all users in the CRM list
  /* const deleteUsersPromises = existingCrmUsers.data.tasks
    .map(async (task: ClickupTask) => stripeConcurrencyLimit(async () =>
    {
      console.log(`Deleting user ${task.id}...`);
      return axios.delete(`${env.CLICKUP_API_ENDPOINT}/task/${task.id}`, clickupRequestConfig);
    }))
    .filter(Boolean);

  await Promise.allSettled(deleteUsersPromises);

  return res.status(200).json({ message: "Finished", ...existingCrmUsers.data });*/

  const getCrmDataForAllUsersPromises = allUsers
    .map(async user => stripeConcurrencyLimit(async () => 
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
    }))
    .filter(Boolean);

  const allUsersWithCrmData = (await Promise.all(getCrmDataForAllUsersPromises)).filter(Boolean);
  const newUsers: typeof allUsersWithCrmData = [];
  const existingUsers: Array<{
    existingCrmUser: ClickupTask;
    userWithCrmData: typeof allUsersWithCrmData[number];
  }> = [];

  allUsersWithCrmData.forEach(user =>
  {
    const matchingCrmUser = existingCrmUsers.data.tasks.find((task: ClickupTask) =>
    {
      const emailCustomField = task.custom_fields?.find((field) => field.id === clickupCrmCustomField.email.fieldId);
      return emailCustomField?.value === user.userData.email;
    });

    if(matchingCrmUser)
    {
      existingUsers.push({
        existingCrmUser: matchingCrmUser,
        userWithCrmData: user
      });
    }
    else
    {
      newUsers.push(user);
    }
  });

  const createNewUsersResults = await Promise.allSettled(newUsers.map(async ({ crmData }) => createClickupTask(env.CLICKUP_CRM_LIST_ID, crmData)));

  printAllSettledPromisesSummary(createNewUsersResults, "create new users");

  const updateUsersPromises: Array<Promise<AxiosResponse>> = [];

  existingUsers.forEach(({ existingCrmUser, userWithCrmData }) =>
  {
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
  });

  const results = await Promise.allSettled(updateUsersPromises);

  printAllSettledPromisesSummary(results, "update users");

  return res.status(200).json({ message: "Finished" });
};

export default handler;
