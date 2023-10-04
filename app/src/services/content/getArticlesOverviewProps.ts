/* eslint-disable @typescript-eslint/naming-convention */
import getAllArticles, { type allArticles } from "./getAllArticles";
import {
  type IGenGetAllLegalAreaQuery,
  type IGenAssetFragment,
} from "../graphql/__generated/sdk";
import { caisySDK } from "../graphql/getSdk";

export interface IArticlesOverviewProps 
{
  __typename: "dictionary";
  allArticles: allArticles;
  allLegalAreaRes: IGenGetAllLegalAreaQuery;
  allMainCategories: Array<{
    __typename?: "MainCategory" | undefined;
    casesPerCategory: number;
    icon?: ({
      __typename?: "Asset" | undefined;
    } & IGenAssetFragment) | null | undefined;
    id?: string | null | undefined;
    mainCategory?: string | null | undefined;
  }> | null;
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

    const allMainCategories = (
      allMainCategoriesRes?.allMainCategory?.edges?.map((category) => ({
        casesPerCategory: allArticlesRes?.filter((articleItem) =>
          articleItem?.mainCategoryField?.[0]?.id === category?.node?.id
        ).length,
        ...category?.node,
      }))
    );

    return {
      __typename: "dictionary",
      allArticles: allArticlesRes,
      allLegalAreaRes,
      allMainCategories: allMainCategories || [],
    };
  }
  catch (error) 
  {
    console.error("Error fetching dictionary overview props:", error);
    throw error;
  }
};

export default getArticlesOverviewProps;
