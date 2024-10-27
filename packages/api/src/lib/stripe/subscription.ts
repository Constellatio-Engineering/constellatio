import { eq } from "@acme/db";
import { db } from "@acme/db/client";
import { users } from "@acme/db/schema";
import { addUserToCrmUpdateQueue } from "~/lib/clickup/utils";
import { getUserIdFromStripeEventData } from "~/lib/stripe/utils";

import type Stripe from "stripe";

export const handleSubscriptionEvent = async (subscriptionData: Stripe.Subscription) =>
{
  const userData = await getUserIdFromStripeEventData(subscriptionData);

  if(userData == null)
  {
    return;
  }

  await db
    .update(users)
    .set({
      subscriptionId: subscriptionData.id,
      subscriptionStatus: subscriptionData.status
    })
    .where(eq(users.stripeCustomerId, userData.stripeCustomerId));

  await addUserToCrmUpdateQueue(userData.userId);
};
