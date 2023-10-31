import { db } from "@/db/connection";
import { users } from "@/db/schema";
import { env } from "@/env.mjs";
import { stripe } from "@/lib/stripe";
import { InternalServerError } from "@/utils/serverError";
import { getDataFromStripeSubscription } from "@/utils/stripe";

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
    return res.status(400).json({ message: `Invalid request method ${error}` });
  }

  const subscriptionObj = event.data.object as Stripe.Subscription;
  const { customer, status: subscriptionStatus } = subscriptionObj;
  const stripeCustomerId = customer as string;
  
  try 
  {
    switch (event.type)
    {
      case "customer.subscription.updated": case "customer.subscription.created":
      {
        const subscriptionData = getDataFromStripeSubscription(subscriptionObj);

        await db
          .update(users)
          .set({
            subscribedPlanPriceId: subscriptionData.subscribedPlanPriceId,
            subscriptionEndDate: subscriptionData.subscriptionEndDate,
            subscriptionStartDate: subscriptionData.subscriptionStartDate,
            subscriptionStatus: subscriptionData.subscriptionStatus
          })
          .where(eq(users.stripeCustomerId, stripeCustomerId));
        break;
      }
      case "customer.subscription.deleted":
      {
        await db
          .update(users)
          .set({
            subscribedPlanPriceId: null,
            subscriptionEndDate: null,
            subscriptionStartDate: null,
            subscriptionStatus
          })
          .where(eq(users.stripeCustomerId, stripeCustomerId));
        break;
      }
      default:
      {
        console.warn(`Unhandled event type ${event.type}`);
      }
    }

    return res.send({ success: true });
  }
  catch (error) 
  {
    console.error(`webhook handler failed. ${error}`);
    return res.send({ success: false });
  }
};

export default handler;
