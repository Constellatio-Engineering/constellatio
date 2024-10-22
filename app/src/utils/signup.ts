import { db } from "@/db/connection";
import {
  type AuthProvider, referrals, type UserInsert, users, usersToBadges 
} from "@/db/schema";
import { env } from "@/env.mjs";
import { addUserToCrmUpdateQueue } from "@/lib/clickup/utils";
import { stripe } from "@/lib/stripe/stripe";
import { addBadgeForUser } from "@/server/api/services/badges.services";
import { InternalServerError } from "@/utils/serverError";
import { getDataFromStripeSubscription } from "@/utils/stripe";
import { printAllSettledPromisesSummary } from "@/utils/utils";

import { type SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { count, eq } from "drizzle-orm";

export type FinishSignUpProps = {
  referralCode?: string;
  supabaseServerClient: SupabaseClient;
  user: {
    authProvider: AuthProvider;
    displayName: string | null;
    email: string;
    firstName: string | null;
    id: string;
    lastName: string | null;
  };
};

export const finishSignup = async ({ referralCode, supabaseServerClient, user }: FinishSignUpProps) =>
{
  const userId = user.id;
  const userEmail = user.email;
  let stripeCustomerId: string | null = null;
  let stripeSubscriptionId: string | null = null;

  try
  {
    if(!userEmail)
    {
      throw new InternalServerError(new Error("User email was null after signUp. This should not happen and must be investigated."));
    }

    const createCustomerResult = await stripe.customers.create({
      address: { country: "DE" },
      email: userEmail,
      metadata: { supabaseUuid: userId },
    });

    stripeCustomerId = createCustomerResult.id;

    const subscription = await stripe.subscriptions.create({
      automatic_tax: { enabled: true },
      customer: stripeCustomerId,
      items: [{ plan: env.STRIPE_PREMIUM_PLAN_PRICE_ID, quantity: 1 }],
      payment_settings: {
        save_default_payment_method: "on_subscription"
      },
      trial_period_days: env.NEXT_PUBLIC_TRIAL_PERIOD_IN_DAYS,
      trial_settings: {
        end_behavior: { missing_payment_method: "cancel" }
      }
    });

    const { subscriptionId, subscriptionStatus } = getDataFromStripeSubscription(subscription);
    stripeSubscriptionId = subscriptionId;

    const userToInsert: UserInsert = {
      authProvider: user.authProvider,
      displayName: user.displayName || `${user.authProvider}-user-${Date.now() + Math.random()}`,
      email: userEmail,
      firstName: user.firstName,
      id: userId,
      lastName: user.lastName,
      stripeCustomerId,
      subscriptionId,
      subscriptionStatus,
    };

    await db.insert(users).values(userToInsert);

    const usersCount = (await db.select({ count: count(users.id) }).from(users))?.[0]?.count;

    // TODO: This should be in the supabase webhook handler
    if(usersCount != null)
    {
      if(usersCount <= 100)
      {
        await addBadgeForUser({ badgeIdentifier: "1-100", userId });
      }
      else if(usersCount > 100 && usersCount <= 1000)
      {
        await addBadgeForUser({ badgeIdentifier: "1-1000", userId });
      }
    }

    if(referralCode)
    {
      // TODO: This should be in the supabase webhook handler

      const referral = await db.query.referralCodes.findFirst({
        where: eq(referrals.code, referralCode)
      });

      if(referral?.userId)
      {
        await db.insert(referrals).values({
          code: referralCode,
          paid: false,
          referredUserId: userId,
          referringUserId: referral.userId,
        });

        // TODO: An immediate discount can be applied here
      }
    }

    await addUserToCrmUpdateQueue(userId);
  }
  catch (e: unknown)
  {
    console.log("Finishing signup failed. Running cleanup. Error was:", e);

    // be careful with the order of the cleanups. This does not use Promise.allSettled() because we want to execute the cleanups in sequential order
    const cleanups: Array<Promise<unknown> | undefined> = [
      stripeSubscriptionId ? stripe.subscriptions.cancel(stripeSubscriptionId) : undefined,
      stripeCustomerId ? stripe.customers.del(stripeCustomerId) : undefined,
      db.delete(referrals).where(eq(referrals.referredUserId, userId)),
      db.delete(usersToBadges).where(eq(usersToBadges.userId, userId)),
      db.delete(users).where(eq(users.id, userId)),
      supabaseServerClient.auth.admin.deleteUser(userId),
    ].filter(Boolean);

    const cleanupResults: Array<PromiseSettledResult<unknown>> = []; 

    for(const cleanup of cleanups)
    {
      try
      {
        const result = await cleanup;
        console.log("result", result);
        cleanupResults.push({ status: "fulfilled", value: result });
      }
      catch (e: unknown)
      {
        cleanupResults.push({ reason: e, status: "rejected" });
      }
    }

    printAllSettledPromisesSummary(cleanupResults, "Failed User Signup Cleanup");

    throw new InternalServerError(new Error("Error while creating user: " + e));
  }
};
