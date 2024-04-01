import { db } from "@/db/connection";
import { users } from "@/db/schema";
import { env } from "@/env.mjs";
import { stripe } from "@/lib/stripe";
import { InternalServerError } from "@/utils/serverError";

import { eq } from "drizzle-orm";
import { type NextApiHandler } from "next";
import getRawBody from "raw-body";
import type Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) =>
{
  const signature = req.headers["stripe-signature"];
  const signingSecret = env.STRIPE_SIGNING_SECRET;
  let event: Stripe.Event;

  try 
  {
    if(!signature)
    {
      throw new InternalServerError(new Error("Missing stripe signature header"));
    }

    const rawBody = await getRawBody(req, { limit: "1mb" });
    event = stripe.webhooks.constructEvent(rawBody, signature, signingSecret);
  }
  catch (error) 
  {
    console.error(`webhook signature verification failed. ${error}`);
    return res.status(400).send("Invalid");
  }

  if(!event.type.startsWith("customer.subscription"))
  {
    return res.status(400).json({ message: "This endpoint only handles 'customer.subscription' events." });
  }

  // we can now safely assume that event.data.object is a subscription object
  const subscriptionData = event.data.object as Stripe.Subscription;
  const stripeCustomerId = subscriptionData.customer;

  if(typeof stripeCustomerId !== "string")
  {
    console.error(`expected stripeCustomerId to be a string. got ${typeof stripeCustomerId} instead.`, stripeCustomerId);
    return res.status(400).send("Invalid");
  }

  const subscriptionDetailsFromDB = await db.query.users.findFirst({
    columns: { subscriptionId: true, subscriptionStatus: true },
    where: eq(users.stripeCustomerId, stripeCustomerId) 
  });

  if(subscriptionDetailsFromDB == null)
  {
    if(env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT === "staging")
    {
      console.info(`customer '${stripeCustomerId}' not found in db, but this is likely because the event was triggered in development`);
      return res.status(200).send("customer not found in db, but this is likely because the event was triggered in development");
    }

    console.error(`no user found with stripeCustomerId ${stripeCustomerId}`);
    return res.status(400).send("customer not found in db");
  }

  await db
    .update(users)
    .set({
      subscriptionId: subscriptionData.id,
      subscriptionStatus: subscriptionData.status
    })
    .where(eq(users.stripeCustomerId, stripeCustomerId));

  return res.send({ success: true });
};

export default handler;
