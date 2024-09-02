/* eslint-disable max-lines */
import { db } from "@/db/connection";
import {
  articlesViews, casesProgress, casesViews, documents, uploadedFiles, users, usersToBadges 
} from "@/db/schema";
import { env } from "@/env.mjs";
import { deleteClickupCustomFieldValue } from "@/lib/clickup/tasks/delete-custom-field-value";
import { updateClickupCustomField } from "@/lib/clickup/tasks/update-custom-field";
import { updateClickupTask } from "@/lib/clickup/tasks/update-task";
import { type ClickupTask } from "@/lib/clickup/types";
import { clickupCrmCustomField, getUserCrmData } from "@/lib/clickup/utils";
import { stripe } from "@/lib/stripe/stripe";
import { sleep } from "@/utils/utils";

import { type SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { type AxiosResponse } from "axios";
import {
  and, countDistinct, eq, getTableColumns, type SQL 
} from "drizzle-orm";
import type { NextApiHandler } from "next";
import pLimit from "p-limit";
import type Stripe from "stripe";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const stripeConcurrencyLimit = pLimit(env.STRIPE_SDK_CONCURRENCY_LIMIT);

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
    const [getUserDataResult] = await getUsersWithActivityStats(eq(users.id, userIdOrData));

    if(getUserDataResult == null)
    {
      console.warn("User not found in database:", userIdOrData);
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
    console.warn("User not found in Supabase Auth:", user.id);
    return null;
  }

  const userSubscriptionId = user.subscriptionId;
  const userStripeCustomerId = user.stripeCustomerId;
  const allInvoices: Stripe.Invoice[] = [];
  let subscriptionData: Stripe.Response<Stripe.Subscription> | null = null;
  let defaultPaymentMethod: Stripe.PaymentMethod | null = null;

  if(userSubscriptionId != null)
  {
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

  if(userStripeCustomerId != null)
  {
    if(defaultPaymentMethod == null)
    {
      const customerData = await stripe.customers.retrieve(userStripeCustomerId);

      if(!customerData.deleted)
      {
        const defaultPaymentMethodIdOrObject = customerData.invoice_settings.default_payment_method;

        if(defaultPaymentMethodIdOrObject != null)
        {
          defaultPaymentMethod = typeof defaultPaymentMethodIdOrObject === "string" ? await stripe.paymentMethods.retrieve(defaultPaymentMethodIdOrObject) : defaultPaymentMethodIdOrObject;
        }
      }
    }

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
  if(env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT !== "development")
  {
    return res.status(401).json({ message: "Unauthorized" });
  }

  console.warn("------- CAUTION: Make sure to use the production environment variables when running this script! -------");

  await sleep(1000);

  // const allUsers = await db.query.users.findMany({
  //   columns: {
  //     email: true,
  //     id: true,
  //   },
  //   orderBy: asc(users.id),
  //   // where: gt(users.id, "0215b17b-592c-4f6a-b99f-bacd6ba273a2")
  // });
  //
  // await db
  //   .insert(updateUserInCrmQueue)
  //   .values(allUsers.map(user => ({ userId: user.id })))
  //   .onConflictDoNothing();

  return res.status(200).json({ message: "Success" });

  // const supabaseServerClient = createPagesServerClient({ req, res }, {
  //   supabaseKey: env.SUPABASE_SERVICE_ROLE_KEY,
  //   supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL
  // });
  //
  // const successfulUpdates: typeof allUsers = [];
  // const failedUpdates: typeof allUsers = [];
  //
  // for(let i = 0; i < allUsers.length; i++)
  // {
  //   const user = allUsers[i]!;
  //
  //   try
  //   {
  //     await updateUserCrmData(user.id, supabaseServerClient);
  //     console.log(`Updated user ${i + 1} - ${user.email}`);
  //     successfulUpdates.push(user);
  //   }
  //   catch (e: unknown)
  //   {
  //     console.log("Failed to update user " + user.email, e);
  //     failedUpdates.push(user);
  //   }
  //
  //   if(i % 8 === 0 && i !== 0)
  //   {
  //     console.log(`Pause at user ${i + 1}. Successful: ${successfulUpdates.length} - Failed: ${failedUpdates.length}`);
  //     await sleep(61000);
  //   }
  // }
  //
  // return res.status(200).json({ failedUpdates, successfulUpdates });

  // const supabaseServerClient = createPagesServerClient({ req, res }, {
  //   supabaseKey: env.SUPABASE_SERVICE_ROLE_KEY,
  //   supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL
  // });
  //
  // const allExistingCrmUsers: Array<{
  //   email: Nullable<unknown>;
  //   name: string;
  //   userId: Nullable<unknown>;
  // }> = [];
  //
  // let hasMore: boolean;
  // let page = 0;
  //
  // do
  // {
  //   console.log(`Fetching CRM users page ${page}...`);
  //   const getUsersResult = await axios.get(`${env.CLICKUP_API_ENDPOINT}/list/${env.CLICKUP_CRM_LIST_ID}/task?page=${page}`, clickupRequestConfig);
  //   const fetchedUsers = getUsersResult.data.tasks as ClickupTask[];
  //   allExistingCrmUsers.push(...fetchedUsers.map(task => ({
  //     email: task.custom_fields?.find(field => field.id === clickupCrmCustomField.email.fieldId)?.value,
  //     name: task.name,
  //     userId: task.custom_fields?.find(field => field.id === clickupCrmCustomField.userId.fieldId)?.value
  //   })));
  //   hasMore = !getUsersResult.data.last_page;
  //
  //   if(hasMore)
  //   {
  //     page++;
  //   }
  // }
  // while(hasMore);
  //
  // console.log("finished. fetched " + allExistingCrmUsers.length + " existing CRM users");
  //
  // const allUsers = await getUsersWithActivityStats();
  //
  // console.log("fetched " + allUsers.length + " users from the database");
  //
  // const getCrmDataForAllUsersPromises = allUsers
  //   .map(async user => stripeConcurrencyLimit(async () => getCrmDataForUser(user, supabaseServerClient)))
  //   .filter(Boolean);
  //
  // const usersWithCrmData = (await Promise.all(getCrmDataForAllUsersPromises)).filter(Boolean);
  //
  // console.log("fetched crm data for all users");
  //
  // for(let i = 0; i < usersWithCrmData.length; i++)
  // {
  //   const user = usersWithCrmData[i]!;
  //
  //   await createClickupTask(env.CLICKUP_CRM_LIST_ID, user.crmData);
  //
  //   console.log(`Created new user ${i + 1} - ${user.crmData.name}`);
  //
  //   if(i % 90 === 0 && i !== 0)
  //   {
  //     console.log(`Created ${i} new users - Pause`);
  //     await sleep(61000);
  //   }
  // }

  // return res.status(200).json({ message: "Finished" });

  // return res.status(200).json(usersWithCrmData);
};

export default handler;
