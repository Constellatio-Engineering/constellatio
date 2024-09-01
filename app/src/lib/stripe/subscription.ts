import { db } from "@/db/connection";
import { users } from "@/db/schema";
import { addUserToCrmUpdateQueue } from "@/lib/clickup/utils";
import { getUserIdFromStripeEventData } from "@/lib/stripe/utils";
 
import { eq } from "drizzle-orm";
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
