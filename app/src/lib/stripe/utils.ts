import { db } from "@/db/connection";
import { users } from "@/db/schema";
import { env } from "@/env.mjs";

import { eq } from "drizzle-orm";
import type Stripe from "stripe";

export const getUserIdFromStripeEventData = async (eventData: Stripe.Invoice | Stripe.Subscription) =>
{
  const stripeCustomerIdOrObject = eventData.customer;
  const stripeCustomerId = typeof stripeCustomerIdOrObject === "string" ? stripeCustomerIdOrObject : stripeCustomerIdOrObject?.id;

  if(!stripeCustomerId)
  {
    throw new Error("no customer id found in stripe invoice event data");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.stripeCustomerId, stripeCustomerId)
  });

  if(user == null)
  {
    if(env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT === "staging")
    {
      console.info(`customer '${stripeCustomerId}' not found in db, but this is likely because the event was triggered in development`);
      return;
    }

    throw new Error(`no user found with stripeCustomerId ${stripeCustomerId}`);
  }

  return ({
    stripeCustomerId,
    userId: user.id
  });
};