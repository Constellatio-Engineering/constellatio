import { createTRPCRouter, publicProcedure } from "../trpc";

export const internalUseOnly_utilsRouter = createTRPCRouter({
  keepAlive: publicProcedure
    .query(() =>
    {
      return { ok: true };
    }),
});
