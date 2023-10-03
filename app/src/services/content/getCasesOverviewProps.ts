/* eslint-disable @typescript-eslint/naming-convention */
import getAllCases, { type AllCases } from "./getAllCases";
import {
  type IGenGetAllMainCategoryQuery,
  type IGenGetAllLegalAreaQuery,
  type IGenAssetFragment,
} from "../graphql/__generated/sdk";
import { caisySDK } from "../graphql/getSdk";
export interface ICasesOverviewProps 
{
  __typename: "case";
  allCases: AllCases;
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

const getCasesOverviewProps = async (): Promise<ICasesOverviewProps> => 
{
  try 
  {
    const [allMainCategoriesRes, allCasesRes, allLegalAreaRes]: [IGenGetAllMainCategoryQuery, AllCases, IGenGetAllLegalAreaQuery] = await Promise.all([
      caisySDK.getAllMainCategory(), getAllCases(), caisySDK.getAllLegalArea()
    ]);

    const allMainCategories = (
      allMainCategoriesRes?.allMainCategory?.edges?.map((category) => ({
        casesPerCategory: allCasesRes?.filter((caseItem) =>
          caseItem?.mainCategoryField?.[0]?.id === category?.node?.id
        ).length,
        ...category?.node,
      })) || null
    );
  
    return {
      __typename: "case",
      allCases: allCasesRes,
      allLegalAreaRes, 
      allMainCategories,
    };
  }
  catch (error) 
  {
    console.error("Error fetching case overview props:", error);
    throw error;
  }
};

export default getCasesOverviewProps;
