import { createTRPCRouter, publicProcedure } from "../trpc";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const internalUseOnly_utilsRouter = createTRPCRouter({
  keepAlive: publicProcedure
    .query(() =>
    {
      return { ok: true };
    }),
});
