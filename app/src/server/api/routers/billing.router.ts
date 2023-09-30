import { db } from "@/db/connection";
import { usersTable } from "@/db/schema";
import { env } from "@/env.mjs";
import { stripe } from "@/lib/stripe";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { InternalServerError } from "@/utils/serverError";

import { eq } from "drizzle-orm";

export const billingRouter = createTRPCRouter({
  generateStripeSessionUrl: protectedProcedure.mutation(async ({ ctx: { userId } }) =>
  {
    const user = await db.query.usersTable.findFirst({ where: eq(usersTable.id, userId) });

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

      await db.update(usersTable).set({ stripeCustomerId }).where(eq(usersTable.id, user.id));
    }

    const { url } = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${env.NEXT_PUBLIC_WEBSITE_URL}/settings/billing`,
    });

    return { stripeUrl: url };
  })
});
