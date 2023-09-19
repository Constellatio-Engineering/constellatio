/* eslint-disable @typescript-eslint/naming-convention */
import getAllArticles, { type allArticles } from "./getAllArticles";
import { type allMainCategories } from "./getCasesOverviewProps";
import {
  type IGenAssetFragment,
  type IGenSubCategoryFragment,
} from "../graphql/__generated/sdk";
import { caisySDK } from "../graphql/getSdk";

export type allSubCategories = Array<IGenSubCategoryFragment | null | undefined> & {
  __typename?: "SubCategory" | undefined;
};

export interface IArticlesOverviewProps 
{
  __typename: "dictionary";
  allArticles: allArticles;
  allMainCategories: allMainCategories;
  allSubCategories: allSubCategories;
}

const getArticlesOverviewProps = async (): Promise<IArticlesOverviewProps> => 
{
  try 
  {
    const [allMainCategoriesRes, allSubCategoriesRes, allArticlesRes] = await Promise.all([
      caisySDK.getAllMainCategory(),
      caisySDK.getAllSubCategory(), getAllArticles({})
    ]);

    const allMainCategories = (
      allMainCategoriesRes?.allMainCategory?.edges?.map((category) => ({
        casesPerCategory: allArticlesRes?.filter((caseItem) =>
          caseItem?.subCategoryField?.some(
            (subCategoryForEachArticle) =>
              subCategoryForEachArticle?.mainCategory?.[0]?.id ===
							category?.node?.id
          )
        ).length,
        ...category?.node,
      })) || null
    );

    const allSubCategories = allSubCategoriesRes?.allSubCategory?.edges?.map((subCategory) => subCategory?.node
    ) || [];

    return {
      __typename: "dictionary",
      allArticles: allArticlesRes,
      allMainCategories,
      allSubCategories,
    };
  }
  catch (error) 
  {
    console.error("Error fetching case overview props:", error);
    throw error;
  }
};

export default getArticlesOverviewProps;
