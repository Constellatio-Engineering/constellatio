/* eslint-disable @typescript-eslint/naming-convention */
import { type ArticleWithNextAndPreviousArticleId } from "@/utils/articles";

import { type AllCases } from "./getAllCases";
import { caisySDK } from "../graphql/getSdk";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getOverviewPageProps = async (items: Array<AllCases[number] | ArticleWithNextAndPreviousArticleId>) =>
{
  const allMainCategoriesRes = await caisySDK.getAllMainCategory();

  const allMainCategories = allMainCategoriesRes?.allMainCategory?.edges
    ?.map((category) => ({
      ...category?.node,
      itemsPerCategory: items
        .filter((item) => item?.mainCategoryField?.[0]?.id === category?.node?.id)
        .length,
    }))
    .filter(Boolean)
   || [];

  return {
    allMainCategories,
  };
};

export type GetOverviewPagePropsResult = Awaited<ReturnType<typeof getOverviewPageProps>>;
