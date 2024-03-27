import { db } from "@/db/connection";
import { type UserInsert, users } from "@/db/schema";
import { env } from "@/env.mjs";
import { stripe } from "@/lib/stripe";
import { registrationFormSchema } from "@/schemas/auth/registrationForm.schema";
import { addBadgeForUser } from "@/server/api/services/badges.services";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getConfirmEmailUrl } from "@/utils/paths";
import { EmailAlreadyTakenError, InternalServerError, RegisterError } from "@/utils/serverError";
import { getDataFromStripeSubscription } from "@/utils/stripe";

import { eq, sql } from "drizzle-orm";

export const authenticationRouter = createTRPCRouter({
  register: publicProcedure
    .input(registrationFormSchema)
    .mutation(async ({ ctx: { supabaseServerClient }, input }) =>
    {
      console.log("--- Registering user ---");

      const start = performance.now();

      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, input.email)
      });

      if(existingUser)
      {
        throw new EmailAlreadyTakenError();
      }

      console.log("starting supabase sign up");

      const { data: signUpData, error: signUpError } = await supabaseServerClient.auth.signUp({
        email: input.email,
        options: { emailRedirectTo: getConfirmEmailUrl() },
        password: input.password
      });

      console.log(`supabase sign up took ${performance.now() - start}ms`);

      if(signUpError)
      {
        console.log("error occurred while signing up", signUpError);
        throw new RegisterError(signUpError);
      }

      const userId = signUpData.user?.id;

      if(!userId)
      {
        throw new InternalServerError(new Error("User ID was null after signUp. This should probably not happen and should be investigated."));
      }

      let stripeCustomerId: string | undefined;
      let subscriptionId: string | undefined;

      try
      {
        const createCustomerResult = await stripe.customers.create({
          email: input.email,
          metadata: { supabaseUuid: userId, },
          name: `${input.firstName} ${input.lastName}`
        });

        stripeCustomerId = createCustomerResult.id;

        const subscription = await stripe.subscriptions.create({
          customer: stripeCustomerId,
          items: [{ plan: env.STRIPE_PREMIUM_PLAN_PRICE_ID, quantity: 1 }],
          payment_settings: {
            save_default_payment_method: "on_subscription"
          },
          trial_period_days: 30,
          trial_settings: {
            end_behavior: { missing_payment_method: "cancel" }
          }
        });

        const { subscriptionId, subscriptionStatus } = getDataFromStripeSubscription(subscription);

        const userToInsert: UserInsert = {
          displayName: input.displayName,
          email: input.email,
          firstName: input.firstName,
          gender: input.gender,
          id: userId,
          lastName: input.lastName,
          semester: input.semester,
          stripeCustomerId,
          subscriptionId,
          subscriptionStatus,
          university: input.university,
        };

        await db.insert(users).values(userToInsert);
      }
      catch (e: unknown)
      {
        console.log("Deleting user because insertion into public schema failed");

        const cleanups: Array<Promise<unknown> | undefined> = [
          supabaseServerClient.auth.admin.deleteUser(userId),
          stripeCustomerId ? stripe.customers.del(stripeCustomerId) : undefined,
          subscriptionId ? stripe.subscriptions.cancel(subscriptionId) : undefined
        ].filter(Boolean);

        const cleanupResults = await Promise.allSettled(cleanups);

        console.log("Cleanup results", cleanupResults);

        for(const cleanupResult of cleanupResults)
        {
          if(cleanupResult.status === "rejected")
          {
            console.error("Error while cleaning up after failed user insertion", cleanupResult.reason);
          }
        }

        throw new InternalServerError(new Error("Error while creating user: " + e));
      }

      const usersCount = (await db.select({ count: sql<number>`cast(count(*) as int)` }).from(users))?.[0]?.count;

      if(usersCount != null)
      {
        if(usersCount <= 100)
        {
          console.log("is one of the first 100 users");
          await addBadgeForUser({ badgeIdentifier: "1-100", userId });
        }
        else if(usersCount > 100 && usersCount <= 1000)
        {
          console.log("is one of the first 1000 users");
          await addBadgeForUser({ badgeIdentifier: "1-1000", userId });
        }
      }

      console.log(`Complete sign up took ${performance.now() - start}ms`);

      if(!signUpData.session)
      {
        // Sign up was successful, but email confirmation is enabled. The user needs to confirm their email address.
        return { resultType: "emailConfirmationRequired" } as const;
      }

      // If the session is available right after sign up, it means that email confirmation is disabled.
      return {
        resultType: "signupComplete",
        session: signUpData.session
      } as const;
    }),
});
