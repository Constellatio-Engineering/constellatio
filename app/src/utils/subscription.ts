import { type User } from "@/db/schema";

type SubscriptionDetails = Pick<User, "subscriptionStatus">;

export const getHasSubscription = (subscriptionStatus: SubscriptionDetails["subscriptionStatus"] | undefined): boolean =>
{
  return subscriptionStatus === "active" || subscriptionStatus === "incomplete" || subscriptionStatus === "trialing";
};
