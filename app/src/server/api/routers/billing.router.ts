import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const billingRouter = createTRPCRouter({
  openStripePortal: protectedProcedure.mutation(() =>
  {
    console.log("openStripePortal");

    return { stripeUrl: "test" };
  })
});
