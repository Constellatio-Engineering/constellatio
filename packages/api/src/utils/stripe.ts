import { User } from "@acme/db/schema";
import type Stripe from "stripe";

type SubscriptionData = Pick<User, "subscriptionStatus" | "subscriptionId">;

export const getDataFromStripeSubscription = (subscription: Stripe.Subscription): SubscriptionData =>
{
  const { status: subscriptionStatus } = subscription;
  const subscriptionId = subscription?.id;

  return {
    subscriptionId,
    subscriptionStatus
  };
};
