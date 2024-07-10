import { db } from "@/db/connection";
import { users } from "@/db/schema";
import { env } from "@/env.mjs";
import { createClickupCrmUser } from "@/lib/clickup/tasks/create-task";
import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";

import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import { and, eq, isNotNull } from "drizzle-orm";
import type { NextApiHandler } from "next";
import type Stripe from "stripe";

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let responseData: any = null;

  const customFields = await axios.get(`${env.CLICKUP_API_ENDPOINT}/list/${env.CLICKUP_CRM_LIST_ID}/field`, {
    headers: {
      Authorization: env.CLICKUP_API_TOKEN,
      "Content-Type": "application/json",
    }
  });

  // console.log(customFields.data);

  const listData = await axios.get(`${env.CLICKUP_API_ENDPOINT}/list/${env.CLICKUP_CRM_LIST_ID}`, {
    headers: {
      Authorization: env.CLICKUP_API_TOKEN,
    }
  });

  // console.log(listData.data);

  const allUsers = await db.query.users.findMany();
  const testUser = await db.query.users.findFirst({
    where: and(isNotNull(users.subscriptionId), eq(users.email, "kotti97+10000@web.de"))
  });
  const testUserSubscriptionId = testUser?.subscriptionId;

  console.log("testUser", testUser);

  let subscriptionData: Stripe.Response<Stripe.Subscription> | null = null;

  if(testUserSubscriptionId != null)
  {
    subscriptionData = await stripe.subscriptions.retrieve(testUserSubscriptionId);
    console.log("subscriptionData", subscriptionData);
  }

  const allSubscriptions = await stripe.subscriptions.list({ customer: testUser!.stripeCustomerId! });
  console.log("allSubscriptions", allSubscriptions);

  responseData = allSubscriptions;

  const { data: { user: supabaseUserData } } = await supabaseServerClient.auth.admin.getUserById(testUser!.id);

  if(!supabaseUserData)
  {
    return res.status(404).json({ message: "User not found" });
  }

  const result = await createClickupCrmUser({
    subscriptionData, 
    supabaseUserData,
    user: testUser!
  });

  console.log("createUserResult", result);

  const crmUsers = await axios.get(`${env.CLICKUP_API_ENDPOINT}/list/${env.CLICKUP_CRM_LIST_ID}/task`, {
    headers: {
      Authorization: env.CLICKUP_API_TOKEN,
    }
  });

  return res.status(200).json({ data: responseData, message: "Success" });
};

export default handler;
