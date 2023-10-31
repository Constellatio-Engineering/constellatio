import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import getAllArticles from "@/services/content/getAllArticles";
import getAllCases from "@/services/content/getAllCases";
import { type IGenMainCategory } from "@/services/graphql/__generated/sdk";
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
  getAllMainCategories: protectedProcedure
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
});
