import { eq } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { users } from "@constellatio/db/schema";
import { env } from "@constellatio/env";
import { appPaths, authPaths } from "@constellatio/shared/paths";
import { stripe } from "~/lib/stripe/stripe";
import { InternalServerError } from "~/utils/serverError";
import { getFutureSubscriptionStatus, getHasSubscription } from "~/utils/subscription";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { type inferProcedureOutput } from "@trpc/server";

export const billingRouter = createTRPCRouter({
  generateStripeBillingPortalSession: protectedProcedure.mutation(async ({ ctx: { userId } }) =>
  {
    const user = await db.query.users.findFirst({ where: eq(users.id, userId) });

    if(!user)
    {
      throw new InternalServerError(new Error("User not found"));
    }

    const { stripeCustomerId } = user;

    if(!stripeCustomerId)
    {
      throw new InternalServerError(new Error("User has no stripe customer id")); 
    }

    const { url } = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      locale: "de",
      return_url: `${env.NEXT_PUBLIC_WEBSITE_URL}${appPaths.profile}?tab=subscription`,
    });

    return url;
  }),
  generateStripeCheckoutSession: protectedProcedure.mutation(async ({ ctx: { userId } }) =>
  {
    const user = await db.query.users.findFirst({ where: eq(users.id, userId) });

    if(!user)
    {
      throw new InternalServerError(new Error("User not found"));
    }

    const { stripeCustomerId } = user;

    if(!stripeCustomerId)
    {
      throw new InternalServerError(new Error("User has no stripe customer id"));
    }

    const { url } = await stripe.checkout.sessions.create({
      allow_promotion_codes: true,
      automatic_tax: { enabled: true },
      cancel_url: `${env.NEXT_PUBLIC_WEBSITE_URL}${appPaths.profile}?tab=subscription`,
      customer: stripeCustomerId,
      line_items: [{ price: env.STRIPE_PREMIUM_PLAN_PRICE_ID, quantity: 1 }],
      locale: "de",
      mode: "subscription",
      payment_method_configuration: env.STRIPE_PAYMENT_METHODS_CONFIGURATION_ID,
      success_url: `${env.NEXT_PUBLIC_WEBSITE_URL}${authPaths.paymentConfirm}`
    });

    if(!url)
    {
      throw new InternalServerError(new Error("Stripe checkout session url was null"));
    }

    return url;
  }),
  getSubscriptionDetails: protectedProcedure.query(async ({ ctx: { userId } }) =>
  {
    const user = await db.query.users.findFirst({
      columns: {
        subscriptionId: true,
        subscriptionStatus: true,
      },
      where: eq(users.id, userId)
    });

    if(!user)
    {
      throw new InternalServerError(new Error("User not found"));
    }

    const userSubscriptionId = user.subscriptionId;

    if(!userSubscriptionId)
    {
      throw new InternalServerError(new Error("User has no subscription id"));
    }

    const subscription = await stripe.subscriptions.retrieve(userSubscriptionId);

    return {
      dbSubscription: user,
      futureSubscriptionStatus: getFutureSubscriptionStatus(subscription),
      hasSubscription: getHasSubscription(user.subscriptionStatus),
      isCanceled: subscription.cancel_at != null,
      stripeSubscription: subscription,
    };
  }),
});

export type SubscriptionDetails = inferProcedureOutput<typeof billingRouter.getSubscriptionDetails>;
