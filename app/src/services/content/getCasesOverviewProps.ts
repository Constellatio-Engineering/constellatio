/* eslint-disable @typescript-eslint/naming-convention */
import getAllCases, { type AllCases } from "./getAllCases";
import {
  type IGenAssetFragment,
  type IGenSubCategoryFragment,
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

export type allSubCategories = Array<IGenSubCategoryFragment | null | undefined> & {
  __typename?: "SubCategory" | undefined;
};

export interface ICasesOverviewProps 
{
  __typename: "case";
  allCases: AllCases;
  allMainCategories: allMainCategories;
  allSubCategories: allSubCategories;
}

const getCasesOverviewProps = async (): Promise<ICasesOverviewProps> => 
{
  try 
  {
    const [allMainCategoriesRes, allSubCategoriesRes, allCasesRes] = await Promise.all([
      caisySDK.getAllMainCategory(),
      caisySDK.getAllSubCategory(), getAllCases()
    ]);

    const allMainCategories = (
      allMainCategoriesRes?.allMainCategory?.edges?.map((category) => ({
        casesPerCategory: allCasesRes?.filter((caseItem) =>
          caseItem?.subCategoryField?.some(
            (subCategoryForEachCase) =>
              subCategoryForEachCase?.mainCategory?.[0]?.id ===
							category?.node?.id
          )
        ).length,
        ...category?.node,
      })) || null
    );

    const allSubCategories = allSubCategoriesRes?.allSubCategory?.edges?.map((subCategory) => subCategory?.node
    ) || [];

    return {
      __typename: "case",
      allCases: allCasesRes,
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

export default getCasesOverviewProps;
