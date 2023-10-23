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
    return res.status(400).end();
  }

  const subscriptionObj = event.data.object as Stripe.Subscription;
  const { customer, status: subscriptionStatus } = subscriptionObj;
  const stripeCustomerId = customer as string;
  
  try 
  {
    switch (event.type)
    {
      case "customer.subscription.updated":
      {
        const updateSubscription = async (): Promise<void> =>
        {
          const subscriptionPlan = subscriptionObj?.items?.data?.[0]?.plan;

          if(!subscriptionPlan)
          {
            console.warn("Subscription plan not found in webhook event");
            return;
          }

          const { id: priceId } = subscriptionPlan;
          const { current_period_end: currentPeriodEnd, current_period_start: currentPeriodStart } = subscriptionObj;
          const subscriptionStartDate = new Date(currentPeriodStart * 1000);
          const subscriptionEndDate = new Date(currentPeriodEnd * 1000);

          if(subscriptionStatus === "active")
          {
            await db.update(users).set({
              priceId,
              subscriptionEndDate,
              subscriptionStartDate,
              subscriptionStatus
            }).where(eq(users.stripeCustomerId, stripeCustomerId));
          }
        };
        await updateSubscription();
        break;
      }
      case "customer.subscription.deleted":
      {
        const deleteSubscription = async (): Promise<void> =>
        {
          if(subscriptionStatus !== "active")
          {
            await db.update(users).set({
              priceId: null, subscriptionEndDate: null, subscriptionStartDate: null, subscriptionStatus
            }).where(eq(users.stripeCustomerId, stripeCustomerId));
          }
        };
        await deleteSubscription();
        break;
      }
      default:
      {
        console.warn(`Unhandled event type ${event.type}`);
      }
    }

    res.send({ success: true });
  }
  catch (error) 
  {
    console.error(`webhook handler failed. ${error}`);
    res.send({ success: false });
  }

  return;
};

export default handler;
