import { getAllLegalFields, getAllSubfields, getAllTopics, getInitialTags } from "~/services/caisy.services";

import { getAllArticles } from "@constellatio/cms/content/getAllArticles";
import { getAllCases } from "@constellatio/cms/content/getAllCases";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const caisyRouter = createTRPCRouter({
  getAllArticles: protectedProcedure.query(async () => getAllArticles({})),
  getAllCases: protectedProcedure.query(async () => getAllCases({})),
  getAllLegalFields: protectedProcedure.query(getAllLegalFields),
  getAllSubfields: protectedProcedure.query(getAllSubfields),
  getAllTopics: protectedProcedure.query(getAllTopics),
  getInitialTags: protectedProcedure.query(getInitialTags),
});
