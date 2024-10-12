/* eslint-disable @typescript-eslint/naming-convention */
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const internalUseOnly_utilsRouter = createTRPCRouter({
  keepAlive: publicProcedure
    .query(() =>
    {
      return { ok: true };
    }),
});
