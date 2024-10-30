import { addUserToCrmUpdateQueue } from "~/lib/clickup/utils";
import { getUserIdFromStripeEventData } from "~/lib/stripe/utils";

import { eq } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { users } from "@constellatio/db/schema";
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
