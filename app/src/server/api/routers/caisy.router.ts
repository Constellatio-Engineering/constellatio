import { getAllLegalFields, getAllSubfields, getAllTopics } from "@/server/api/services/caisy.services";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import getAllArticles from "@/services/content/getAllArticles";
import getAllCases from "@/services/content/getAllCases";

export const caisyRouter = createTRPCRouter({
  getAllArticles: protectedProcedure.query(async () => getAllArticles({})),
  getAllCases: protectedProcedure.query(async () => getAllCases({})),
  getAllLegalFields: protectedProcedure.query(getAllLegalFields),
  getAllSubfields: protectedProcedure.query(getAllSubfields),
  getAllTopics: protectedProcedure.query(getAllTopics),
});
