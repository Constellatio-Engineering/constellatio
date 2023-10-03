/* eslint-disable @typescript-eslint/naming-convention */
import getAllCases, { type AllCases } from "./getAllCases";
import {
  type IGenAssetFragment,
  type IGenGetAllMainCategoryQuery,
  type IGenGetAllLegalAreaQuery,
} from "../graphql/__generated/sdk";
import { caisySDK } from "../graphql/getSdk";

export type allMainCategories = Array<{
  __typename?: "MainCategory" | undefined;
  casesPerCategory: number;
  icon?: ({
    __typename?: "Asset" | undefined;
  } & IGenAssetFragment) | null | undefined;
  id?: string | null | undefined;
  mainCategory?: string | null | undefined;
}> | null;

export interface ICasesOverviewProps 
{
  __typename: "case";
  allCases: AllCases;
  allLegalAreaRes: IGenGetAllLegalAreaQuery;
  allMainCategoriesRes: IGenGetAllMainCategoryQuery;
}

const getCasesOverviewProps = async (): Promise<ICasesOverviewProps> => 
{
  try 
  {
    const [allMainCategoriesRes, allCasesRes, allLegalAreaRes]: [IGenGetAllMainCategoryQuery, AllCases, IGenGetAllLegalAreaQuery] = await Promise.all([
      caisySDK.getAllMainCategory(), getAllCases(), caisySDK.getAllLegalArea()
    ]);
  
    return {
      __typename: "case",
      allCases: allCasesRes,
      allLegalAreaRes, 
      allMainCategoriesRes,
    };
  }
  catch (error) 
  {
    console.error("Error fetching case overview props:", error);
    throw error;
  }
};

export default getCasesOverviewProps;
