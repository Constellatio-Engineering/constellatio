import { type IGenAllMainCategoryQuery } from "../graphql/__generated/sdk";
import { caisySDK } from "../graphql/getSdk";

export interface getAllCategoriesResult 
{
  Categories: IGenAllMainCategoryQuery | null;
}

export const getAllCategories = async (): Promise<getAllCategoriesResult> => 
{
  const Categories = await caisySDK.allMainCategory();

  return {
    Categories,
  };
};

