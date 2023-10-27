import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import getAllArticles from "@/services/content/getAllArticles";
import getAllCases from "@/services/content/getAllCases";

export const caisyRouter = createTRPCRouter({
  getAllArticles: protectedProcedure
    .query(async () =>
    {
      return getAllArticles({});
    }),
  getAllCases: protectedProcedure
    .query(async () =>
    {
      return getAllCases({});
    }),
});
