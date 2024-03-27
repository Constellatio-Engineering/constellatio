import { type User } from "@/db/schema";

import type Stripe from "stripe";

type SubscriptionData = Pick<User, "subscriptionStatus" | "subscriptionId">;

export const getDataFromStripeSubscription = (subscription: Stripe.Subscription): SubscriptionData =>
{
  const { status: subscriptionStatus } = subscription;
  const subscriptionId = subscription?.id;
  const { current_period_end: currentPeriodEnd, current_period_start: currentPeriodStart } = subscription;
  const subscriptionStartDate = new Date(currentPeriodStart * 1000);
  const subscriptionEndDate = new Date(currentPeriodEnd * 1000);
  
  return {
    // subscriptionEndDate,
    subscriptionId,
    // subscriptionStartDate,
    subscriptionStatus
  };
};
