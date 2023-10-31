import { type User } from "@/db/schema";

type SubscriptionDetails = Pick<User, "subscriptionStatus">;

export const getHasSubscription = (subscriptionDetails: SubscriptionDetails | undefined): boolean | undefined =>
{
  if(subscriptionDetails == null)
  {
    return undefined;
  }

  const { subscriptionStatus } = subscriptionDetails;

  return subscriptionStatus === "active" || subscriptionStatus === "trialing" || subscriptionStatus === "incomplete";
};
