import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

let count = 0;
let lastPing = Date.now();

export const userActivityRouter = createTRPCRouter({
  ping: protectedProcedure
    /* .input(z.object({
      isIdle: z.boolean(),
      isTabActive: z.boolean(),
      tab: z.string(),
    }))*/
    .mutation(({ ctx: { userId }, /* input: { isIdle, isTabActive, tab }*/ }) =>
    {
      const timeSinceLastPing = Date.now() - lastPing;

      // eslint-disable-next-line sort-keys-fix/sort-keys-fix
      console.log(`PING ${userId} - #${count} - ${timeSinceLastPing}ms since last ping`);

      count += 1;

      lastPing = Date.now();

      return "PONG";
    }),
});
