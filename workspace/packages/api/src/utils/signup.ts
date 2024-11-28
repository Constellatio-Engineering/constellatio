import { eq } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import {
  profilePictures, referrals, type UserInsert, users, usersToBadges 
} from "@constellatio/db/schema";
import { env } from "@constellatio/env";
import { type Nullable } from "@constellatio/utility-types";
import { getRandomUuid } from "@constellatio/utils/id";
import { printAllSettledPromisesSummary } from "@constellatio/utils/promise";
import { type SupabaseClient } from "@supabase/auth-helpers-nextjs";

import { InternalServerError } from "./serverError";
import { getDataFromStripeSubscription } from "./stripe";
import { addUserToCrmUpdateQueue } from "../lib/clickup/utils";
import { stripe } from "../lib/stripe/stripe";

/* export type FinishSignUpProps = {
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
};*/

export type FinishSignUpProps = {
  referralCode?: string;
  supabaseServerClient: SupabaseClient;
  user: Omit<UserInsert, "subscriptionStatus" | "stripeCustomerId" | "stripeSubscriptionId" | "displayName"> & {
    displayName: Nullable<UserInsert["displayName"]>;
    socialAuthProfilePictureUrl: Nullable<string>;
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
      gender: user.gender,
      id: userId,
      lastName: user.lastName,
      semester: user.semester,
      stripeCustomerId,
      subscriptionId,
      subscriptionStatus,
      university: user.university,
    };

    await db.insert(users).values(userToInsert);

    if(user.socialAuthProfilePictureUrl)
    {
      await db
        .insert(profilePictures)
        .values({
          contentType: null,
          fileExtension: null,
          id: getRandomUuid(),
          profilePictureSource: "external",
          url: user.socialAuthProfilePictureUrl,
          userId
        })
        .onConflictDoNothing();
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
