import { db } from "@/db/connection";
import { users } from "@/db/schema";
import { env } from "@/env.mjs";
import { stripe } from "@/lib/stripe";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
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

    const { url } = await stripe.checkout.sessions.create({
      cancel_url: `${env.NEXT_PUBLIC_WEBSITE_URL}/settings/billing`,
      customer: stripeCustomerId,
      line_items: [{ price: env.STRIPE_PREMIUM_PLAN_PRICE_ID, quantity: 1 }],
      mode: "subscription",
      payment_method_types: ["card"],
      success_url: `${env.NEXT_PUBLIC_WEBSITE_URL}/settings/success`,
    });

    return { stripeUrl: url };
  }),
});
