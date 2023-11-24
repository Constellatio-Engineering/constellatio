import { db } from "@/db/connection";
import { users } from "@/db/schema";
import { env } from "@/env.mjs";
import { stripe } from "@/lib/stripe";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { paths } from "@/utils/paths";
import { InternalServerError } from "@/utils/serverError";

import { eq } from "drizzle-orm";

export const billingRouter = createTRPCRouter({
  generateStripeCheckoutSession: protectedProcedure.mutation(async ({ ctx: { userId } }) =>
  {
    const user = await db.query.users.findFirst({ where: eq(users.id, userId) });

    if(!user)
    {
      throw new InternalServerError(new Error("User not found"));
    }

    let { stripeCustomerId } = user;

    if(!stripeCustomerId)
    {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabaseUuid: user.id,
        },
        name: `${user.firstName} ${user.lastName}`
      });

      stripeCustomerId = customer.id;

      await db.update(users).set({ stripeCustomerId }).where(eq(users.id, user.id));
    }

    const { url: checkoutSessionUrl } = await stripe.checkout.sessions.create({
      allow_promotion_codes: true,
      cancel_url: `${env.NEXT_PUBLIC_WEBSITE_URL}${paths.profile}?tab=subscription`,
      customer: stripeCustomerId,
      line_items: [{ price: env.STRIPE_PREMIUM_PLAN_PRICE_ID, quantity: 1 }],
      locale: "de",
      mode: "subscription",
      payment_method_configuration: env.STRIPE_PAYMENT_METHODS_CONFIGURATION_ID,
      success_url: `${env.NEXT_PUBLIC_WEBSITE_URL}${paths.paymentConfirm}`
    });

    const { url: billingPortalSessionUrl } = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      locale: "de",
      return_url: `${env.NEXT_PUBLIC_WEBSITE_URL}${paths.profile}?tab=subscription`
    });

    return { billingPortalSessionUrl, checkoutSessionUrl };
  }),
  getSubscriptionDetails: protectedProcedure.query(async ({ ctx: { userId } }) =>
  {
    return db.query.users.findFirst({
      columns: {
        subscriptionEndDate: true,
        subscriptionId: true,
        subscriptionStartDate: true,
        subscriptionStatus: true,
        trialSubscriptionId: true,
      },
      where: eq(users.id, userId)
    });
  }),
});
