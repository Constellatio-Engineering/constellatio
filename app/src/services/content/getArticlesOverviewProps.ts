/* eslint-disable @typescript-eslint/naming-convention */
import getAllArticles, { type allArticles } from "./getAllArticles";
import {
  type IGenGetAllLegalAreaQuery,
  type IGenAssetFragment,
  type IGenMainCategory,
} from "../graphql/__generated/sdk";
import { caisySDK } from "../graphql/getSdk";

export type IMainCategory = IGenMainCategory & { casesPerCategory: number };
export interface IArticlesOverviewProps 
{
  __typename: "dictionary";
  allArticles: allArticles;
  allLegalAreaRes: IGenGetAllLegalAreaQuery;
  allMainCategories: IMainCategory[];
}

const getArticlesOverviewProps = async (): Promise<IArticlesOverviewProps> => 
{
  try 
  {
    const [allMainCategoriesRes, allLegalAreaRes, allArticlesRes] = await Promise.all([
      caisySDK.getAllMainCategory(),
      caisySDK.getAllLegalArea(), 
      getAllArticles()
    ]);

    const allMainCategories: IArticlesOverviewProps["allMainCategories"] = (
      allMainCategoriesRes?.allMainCategory?.edges?.map((category) => ({
        casesPerCategory: allArticlesRes?.filter((articleItem) =>
          articleItem?.mainCategoryField?.[0]?.id === category?.node?.id
        )?.length ?? 0,
        ...category?.node,
      }))
    ) || [];

    return {
      __typename: "dictionary",
      allArticles: allArticlesRes,
      allLegalAreaRes,
      allMainCategories,
    };
  }
  catch (error) 
  {
    console.error("Error fetching dictionary overview props:", error);
    throw error;
  }
};

export default getArticlesOverviewProps;
