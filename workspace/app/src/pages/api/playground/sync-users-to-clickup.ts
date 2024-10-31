/* eslint-disable max-lines */
import { env } from "@/env.mjs";

import { type NextApiHandler } from "next";
// import pLimit from "p-limit";

/* import { getCrmDataForUser } from "@constellatio/api/lib/clickup/utils";
import {
  and, countDistinct, eq, getTableColumns, type SQL 
} from "@constellatio/db";
import { db } from "@constellatio/db/client";
import {
  casesProgress, contentViews, documents, uploadedFiles, users, usersToBadges 
} from "@constellatio/db/schema";
import { createPagesServerClient, type SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { type AxiosResponse } from "axios";
import type { NextApiHandler } from "next";
import pLimit from "p-limit";
import type Stripe from "stripe";

import { deleteClickupCustomFieldValue } from "@/lib/clickup/tasks/delete-custom-field-value";
import { updateClickupCustomField } from "@/lib/clickup/tasks/update-custom-field";
import { updateClickupTask } from "@/lib/clickup/tasks/update-task";
import { type ClickupTask } from "@/lib/clickup/types";
import { clickupCrmCustomField, getUserCrmData } from "@/lib/clickup/utils";
import { stripe } from "@/lib/stripe/stripe";*/

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const stripeConcurrencyLimit = pLimit(env.STRIPE_SDK_CONCURRENCY_LIMIT);

// eslint-disable-next-line @typescript-eslint/require-await
const handler: NextApiHandler = async (_req, res): Promise<void> =>
{
  if(env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT !== "development")
  {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return res.status(400).json({ message: "Not implemented" });

  // await sleep(1000);

  /* const supabaseServerClient = createPagesServerClient({ req, res }, {
    supabaseKey: env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL
  });

  const test = await getCrmDataForUser("4cfc014e-8bcc-4799-8b50-2db0ecb01936", supabaseServerClient);

  console.log(test);*/

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

  // return res.status(200).json({ message: "Success" });

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
