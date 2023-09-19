import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import getAllCases from "@/services/content/getAllCases";

export const caisyRouter = createTRPCRouter({
  getAllCases: protectedProcedure
    .query(async () =>
    {
      return getAllCases({});
    }),
});
