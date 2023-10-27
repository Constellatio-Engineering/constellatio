/* eslint-disable @typescript-eslint/naming-convention */
import getAllCases, { type AllCases } from "./getAllCases";
import { type IMainCategory } from "./getArticlesOverviewProps";
import {
  type IGenGetAllMainCategoryQuery,
  type IGenGetAllLegalAreaQuery,
} from "../graphql/__generated/sdk";
import { caisySDK } from "../graphql/getSdk";
export interface ICasesOverviewProps 
{
  __typename: "case";
  allCases: AllCases;
  allLegalAreaRes: IGenGetAllLegalAreaQuery;
  allMainCategories: IMainCategory[];
}

const getCasesOverviewProps = async (): Promise<ICasesOverviewProps> => 
{
  try 
  {
    const [allMainCategoriesRes, allCasesRes, allLegalAreaRes]: [IGenGetAllMainCategoryQuery, AllCases, IGenGetAllLegalAreaQuery] = await Promise.all([
      caisySDK.getAllMainCategory(),
      getAllCases(),
      caisySDK.getAllLegalArea()
    ]);

    const allMainCategories = (
      allMainCategoriesRes?.allMainCategory?.edges?.map((category) => ({
        casesPerCategory: allCasesRes?.filter((caseItem) =>
          caseItem?.mainCategoryField?.[0]?.id === category?.node?.id
        ).length,
        ...category?.node,
      }))
    ) || [];
  
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
