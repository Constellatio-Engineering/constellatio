import { type User } from "@/db/schema";

type SubscriptionDetails = Pick<User, "subscriptionStatus">;

type SubscriptStatus = {
  isOnPaidSubscription: boolean;
  isOnTrailSubscription: boolean;
};

export const getHasSubscription = (subscriptionDetails: SubscriptionDetails | undefined): SubscriptStatus =>
{
  const { subscriptionStatus } = subscriptionDetails ?? {};

  return {
    isOnPaidSubscription: subscriptionStatus === "active" || subscriptionStatus === "incomplete", 
    isOnTrailSubscription: subscriptionStatus === "trialing"
  };
};
