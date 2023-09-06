import { type IGenAllSubCategoryQuery } from "../graphql/__generated/sdk";
import { caisySDK } from "../graphql/getSdk";

export interface getAllSubcategories 
{
  Subcategories: IGenAllSubCategoryQuery | null;
}

export const getAllSubcategories = async (): Promise<getAllSubcategories> =>
{
  const Subcategories = await caisySDK.allSubCategory();

  return {
    Subcategories,
  };
};
