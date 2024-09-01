/* eslint-disable max-lines */
import { db } from "@/db/connection";
import {
  articlesViews, badges, casesProgress, casesSolutions, casesViews, documents, uploadedFiles, type User, users, usersToBadges
} from "@/db/schema";
import { env } from "@/env.mjs";
import { createClickupTask } from "@/lib/clickup/tasks/create-task";
import { deleteClickupCustomFieldValue } from "@/lib/clickup/tasks/delete-custom-field-value";
import { updateClickupCustomField } from "@/lib/clickup/tasks/update-custom-field";
import { updateClickupTask } from "@/lib/clickup/tasks/update-task";
import { type ClickupTask } from "@/lib/clickup/types";
import { clickupCrmCustomField, clickupRequestConfig, getUserCrmData } from "@/lib/clickup/utils";
import { stripe } from "@/lib/stripe";
import { type Nullable } from "@/utils/types";
import { sleep } from "@/utils/utils";

import { createPagesServerClient, type SupabaseClient } from "@supabase/auth-helpers-nextjs";
import axios, { AxiosError, type AxiosResponse } from "axios";
import {
  and,
  count, countDistinct, eq, getTableColumns, type SQL, sql
} from "drizzle-orm";
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

export const getUsersWithActivityStats = async (query?: SQL) =>
{
  return db
    .select({
      ...getTableColumns(users),
      completedBadges: countDistinct(usersToBadges.badgeId),
      completedCases: countDistinct(casesProgress.caseId),
      createdDocuments: countDistinct(documents.id),
      uploadedFiles: countDistinct(uploadedFiles.id),
      viewedArticles: countDistinct(articlesViews.articleId),
      viewedCases: countDistinct(casesViews.caseId)
    })
    .from(users)
    .where(query)
    .leftJoin(casesViews, eq(users.id, casesViews.userId))
    .leftJoin(articlesViews, eq(users.id, articlesViews.userId))
    .leftJoin(documents, eq(users.id, documents.userId))
    .leftJoin(uploadedFiles, eq(users.id, uploadedFiles.userId))
    .leftJoin(usersToBadges, eq(users.id, usersToBadges.userId))
    .leftJoin(casesProgress,
      and(
        eq(casesProgress.progressState, "completed"),
        eq(users.id, casesProgress.userId)
      )
    )
    .groupBy(users.id);
};

export type UserWithActivityStats = Awaited<ReturnType<typeof getUsersWithActivityStats>>[number];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getCrmDataForUser = async (userIdOrData: string | UserWithActivityStats, supabaseServerClient: SupabaseClient<never, "public", never>) =>
{
  let user: UserWithActivityStats;

  if(typeof userIdOrData === "string")
  {
    const [getUserDataResult] = await getUsersWithActivityStats(eq(users.email, userIdOrData));

    if(getUserDataResult == null)
    {
      return null;
    }

    user = getUserDataResult;
  }
  else
  {
    user = userIdOrData;
  }

  const { data: { user: supabaseUserData } } = await supabaseServerClient.auth.admin.getUserById(user.id);

  if(!supabaseUserData)
  {
    return null;
  }

  const userSubscriptionId = user.subscriptionId;
  const userStripeCustomerId = user.stripeCustomerId;
  const allInvoices: Stripe.Invoice[] = [];
  let subscriptionData: Stripe.Response<Stripe.Subscription> | null = null;
  let defaultPaymentMethod: Stripe.PaymentMethod | null = null;

  if(userStripeCustomerId != null)
  {
    console.log(`Fetching invoices for user ${user.id}...`);

    let hasMore = true;
    let lastInvoiceId: string | undefined;

    while(hasMore) 
    {
      const _invoices = await stripe.invoices.list({
        customer: userStripeCustomerId,
        limit: 100,
        starting_after: lastInvoiceId,
        status: "paid"
      });

      if(_invoices == null)
      {
        break;
      }

      allInvoices.push(..._invoices.data);
      hasMore = _invoices.has_more;

      if(hasMore)
      {
        lastInvoiceId = _invoices.data[_invoices.data.length - 1]?.id;
      }
    }
  }

  if(userSubscriptionId != null)
  {
    console.log(`Fetching subscription data for user ${user.id}...`);
    subscriptionData = await stripe.subscriptions.retrieve(userSubscriptionId);
    const defaultPaymentMethodIdOrObject = subscriptionData.default_payment_method;

    if(defaultPaymentMethodIdOrObject != null)
    {
      if(typeof defaultPaymentMethodIdOrObject === "string")
      {
        defaultPaymentMethod = await stripe.paymentMethods.retrieve(defaultPaymentMethodIdOrObject);
      }
      else
      {
        defaultPaymentMethod = defaultPaymentMethodIdOrObject;
      }
    }
  }

  const crmData = getUserCrmData({
    allInvoices,
    defaultPaymentMethod,
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
}) =>
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
      case "labels":
      {
        throw new Error("Updating labels is not supported yet");
      }
      case "number":
      case "date":
      case "currency":
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
      case "short_text":
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
  /* const test = await getUsersWithActivityStats(eq(users.email, "kotti97+10018@web.de"));

  return res.status(200).json(test);*/

  /* const allUsersQuery = await db
    .select({
      ...getTableColumns(users),
      articleIds: sql`array_agg(DISTINCT ${articlesViews.articleId})`,
      caseIds: sql`array_agg(DISTINCT ${casesViews.caseId})`,
      viewedArticles: count(articlesViews.articleId),
      viewedArticlesDistinct: countDistinct(articlesViews.articleId),
      viewedCases: count(casesViews.caseId),
      viewedCasesDistinct: countDistinct(casesViews.caseId)
      // viewedArticles: countDistinct(articlesViews.articleId),
      // viewedCases: countDistinct(casesViews.caseId)
    })
    .from(users)
    .where(eq(users.email, "kotti97+10018@web.de"))
    .leftJoin(casesViews, eq(users.id, casesViews.userId))
    .leftJoin(articlesViews, eq(users.id, articlesViews.userId))
    .groupBy(users.id)
  ;*/

  if(env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT !== "development")
  {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const supabaseServerClient = createPagesServerClient({ req, res }, {
    supabaseKey: env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL
  });

  /* const allExistingCrmUsers: Array<{
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
    allExistingCrmUsers.push(...fetchedUsers.map(task => ({
      email: task.custom_fields?.find(field => field.id === clickupCrmCustomField.email.fieldId)?.value,
      name: task.name,
      userId: task.custom_fields?.find(field => field.id === clickupCrmCustomField.userId.fieldId)?.value
    })));
    hasMore = !getUsersResult.data.last_page;

    if(hasMore)
    {
      console.log("Fetching next page...");
      page++;
    }
  }
  while(hasMore);

  console.log("finished. fetched " + allExistingCrmUsers.length + " customers");*/

  // const allUsers = await db.query.users.findMany();
  const allUsers = await getUsersWithActivityStats(eq(users.email, "kotti97+310824@web.de"));

  const getCrmDataForAllUsersPromises = allUsers
    .map(async user => stripeConcurrencyLimit(async () => getCrmDataForUser(user, supabaseServerClient)))
    .filter(Boolean);
  const usersWithCrmData = (await Promise.all(getCrmDataForAllUsersPromises)).filter(Boolean);

  const createTaskResult = await createClickupTask(env.CLICKUP_CRM_LIST_ID, usersWithCrmData[0]!.crmData);

  // console.log(`Fetched ${usersWithCrmData.length} users`);

  console.log("created task", createTaskResult);

  /* for(let i = 0; i < newUsers.length; i++)
  {
    const user = newUsers[i]!;
    await createClickupTask(env.CLICKUP_CRM_LIST_ID, user.crmData);

    console.log(`Created new user ${i + 1} - ${user.crmData.name}`);

    if(i % 90 === 0 && i !== 0)
    {
      console.log(`Created ${i} new users - Pause`);
      await sleep(61000);
    }
  }*/

  // return res.status(200).json({ message: "Finished" });

  return res.status(200).json(usersWithCrmData);
};

export default handler;
