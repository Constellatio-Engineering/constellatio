import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import getAllArticles from "@/services/content/getAllArticles";
import getAllCases from "@/services/content/getAllCases";
import { type IGenLegalArea, type IGenMainCategory, type IGenTopic } from "@/services/graphql/__generated/sdk";
import { caisySDK } from "@/services/graphql/getSdk";

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
  getAllLegalFields: protectedProcedure
    .query(async () =>
    {
      const allCategoryRes = await caisySDK.getAllMainCategory();
      const categories: IGenMainCategory[] = allCategoryRes
        ?.allMainCategory
        ?.edges
        ?.map((edge) => edge?.node)
        ?.filter(Boolean)
        ?? [];
      return categories;
    }),
  getAllSubfields: protectedProcedure
    .query(async () =>
    {
      const allLegalAreaRes = await caisySDK.getAllLegalArea();
      const legalAreas: IGenLegalArea[] = allLegalAreaRes
        ?.allLegalArea
        ?.edges
        ?.map((edge) => edge?.node)
        ?.filter(Boolean)
        ?? [];
      return legalAreas;
    }),
  getAllTopics: protectedProcedure
    .query(async () =>
    {
      const allTopicsRes = await caisySDK.getAllTopics();
      const topics: IGenTopic[] = allTopicsRes
        ?.allTopic
        ?.edges
        ?.map((edge) => edge?.node)
        ?.filter(Boolean)
        ?? [];
      return topics;
    }),
});
