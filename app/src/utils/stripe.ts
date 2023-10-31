import { type User } from "@/db/schema";

import type Stripe from "stripe";

type SubscriptionData = Pick<User, "subscriptionStatus" | "subscribedPlanPriceId" | "subscriptionEndDate" | "subscriptionStartDate">;

export const getDataFromStripeSubscription = (subscription: Stripe.Subscription): SubscriptionData =>
{
  const { status: subscriptionStatus } = subscription;
  const subscriptionPlan = subscription?.items?.data?.[0]?.plan;

  if(!subscriptionPlan)
  {
    throw new Error("Subscription plan not found in webhook event");
  }

  const { id: subscribedPlanPriceId } = subscriptionPlan;
  const { current_period_end: currentPeriodEnd, current_period_start: currentPeriodStart } = subscription;
  const subscriptionStartDate = new Date(currentPeriodStart * 1000);
  const subscriptionEndDate = new Date(currentPeriodEnd * 1000);
  
  return {
    subscribedPlanPriceId,
    subscriptionEndDate,
    subscriptionStartDate,
    subscriptionStatus
  };
};
