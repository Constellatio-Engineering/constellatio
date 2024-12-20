import { eq } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { users } from "@constellatio/db/schema";
import { env } from "@constellatio/env";
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
    if(env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT !== "production")
    {
      console.info(`customer '${stripeCustomerId}' not found in db, but this is likely because the event was triggered in development or staging`);
      return;
    }

    throw new Error(`no user found with stripeCustomerId ${stripeCustomerId}`);
  }

  return ({
    stripeCustomerId,
    userId: user.id
  });
};
