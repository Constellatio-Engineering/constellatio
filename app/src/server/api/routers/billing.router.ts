import { db } from "@/db/connection";
import { usersTable } from "@/db/schema";
import { getURL } from "@/lib/get-url";
import { stripe } from "@/lib/stripe";
import { createOrRetrieveCustomer } from "@/lib/supabase-admin";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { InternalServerError } from "@/utils/serverError";

import { eq } from "drizzle-orm";

export const billingRouter = createTRPCRouter({
  openStripePortal: protectedProcedure.mutation(async ({ ctx: { supabaseServerClient, userId } }) =>
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

    try
    {
      const stripeCustomerId = await createOrRetrieveCustomer({
        email: user.email,
        uuid: user.id,
      });

      const { url } = await stripe.billingPortal.sessions.create({
        customer: stripeCustomerId,
        return_url: `${getURL()}/settings/billing`,
      });

      return res.status(200).json({
        url,
      });
    }
    catch (error: unknown)
    {
      console.log(error);
      return res.status(500).send("Something went wrong");
    }

    return { stripeUrl: "test" };
  })
});
