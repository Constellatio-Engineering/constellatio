import { type User } from "@/db/schema";

import type Stripe from "stripe";

type SubscriptionDetails = Pick<User, "subscriptionStatus">;

export const getHasSubscription = (subscriptionStatus: SubscriptionDetails["subscriptionStatus"] | undefined): boolean =>
{
  return subscriptionStatus === "active" || subscriptionStatus === "incomplete" || subscriptionStatus === "trialing";
};

type FutureSubscriptionStatus = "willBeCanceled" | "trialWillExpire" | "trialWillBecomeSubscription" | "willContinue" | null;

export const getFutureSubscriptionStatus = (subscription: Stripe.Subscription): FutureSubscriptionStatus =>
{
  const {
    cancel_at: cancelAt,
    default_payment_method: defaultPaymentMethod,
    status,
    trial_end: trialEnd
  } = subscription;

  let futureSubscriptionStatus: FutureSubscriptionStatus;

  if(cancelAt)
  {
    futureSubscriptionStatus = "willBeCanceled";
  }
  else if(status === "trialing")
  {
    if(trialEnd == null)
    {
      futureSubscriptionStatus = null;
    }
    else
    {
      if(defaultPaymentMethod == null)
      {
        futureSubscriptionStatus = "trialWillExpire";
      }
      else
      {
        futureSubscriptionStatus = "trialWillBecomeSubscription";
      }
    }
  }
  else
  {
    futureSubscriptionStatus = "willContinue";
  }

  return futureSubscriptionStatus;
};

