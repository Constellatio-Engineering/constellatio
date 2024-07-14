import { db } from "@/db/connection";
import { env } from "@/env.mjs";
import { clickupCrmCustomField, type ClickupTask, createClickupTask, getUserCrmData } from "@/lib/clickup/tasks/create-task";
import { stripe } from "@/lib/stripe";

import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import axios, { type AxiosRequestConfig } from "axios";
import type { NextApiHandler } from "next";
import type Stripe from "stripe";

const clickupRequestConfig: AxiosRequestConfig = {
  headers: {
    Authorization: env.CLICKUP_API_TOKEN
  }
};

const handler: NextApiHandler = async (req, res): Promise<void> =>
{
  if(req.headers.authorization !== `Bearer ${env.CRON_SECRET}`)
  {
    console.log("req.headers.Authorization", req.headers.authorization);
    return res.status(401).json({ message: "Unauthorized" });
  }

  const supabaseServerClient = createPagesServerClient({ req, res }, {
    supabaseKey: env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL
  });

  /* const customFields = await axios.get(`${env.CLICKUP_API_ENDPOINT}/list/${env.CLICKUP_CRM_LIST_ID}/field`, {
    headers: {
      Authorization: env.CLICKUP_API_TOKEN,
      "Content-Type": "application/json",
    }
  });*/

  const allUsers = await db.query.users.findMany();
  const existingCrmUsers = await axios.get(`${env.CLICKUP_API_ENDPOINT}/list/${env.CLICKUP_CRM_LIST_ID}/task`, clickupRequestConfig);

  const getCrmDataForAllUsersPromises = allUsers
    .map(async (user) =>
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
    })
    .filter(Boolean);

  const allUsersWithCrmData = (await Promise.all(getCrmDataForAllUsersPromises)).filter(Boolean);
  const newUsers: typeof allUsersWithCrmData = [];
  const existingUsers: typeof allUsersWithCrmData = [];

  allUsersWithCrmData.forEach(user =>
  {
    const matchingCrmUser = existingCrmUsers.data.tasks.find((task: ClickupTask) =>
    {
      const emailCustomField = task.custom_fields?.find((field) => field.id === clickupCrmCustomField.email.fieldId);
      return emailCustomField?.value === user.userData.email;
    });

    if(matchingCrmUser)
    {
      existingUsers.push(user);
    }
    else
    {
      newUsers.push(user);
    }
  });

  console.log("newUsers", newUsers);
  console.log("existingUsers", existingUsers);

  await Promise.all(newUsers.map(async ({ crmData }) => createClickupTask(crmData)));

  console.log("end createTasksForNewUsers");
  console.log("-----------");

  return res.status(200).json({ message: "Success" });
};

export default handler;
