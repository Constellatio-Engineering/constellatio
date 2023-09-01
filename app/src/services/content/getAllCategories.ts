import { type IGenQ_All_CategoryQuery } from "../graphql/__generated/sdk";
import { caisySDK } from "../graphql/getSdk";

export interface getAllCategoriesResult 
{
  Categories: IGenQ_All_CategoryQuery | null;
}

export const getAllCategories = async (): Promise<getAllCategoriesResult> => 
{
  const Categories = await caisySDK.q_all_category();

  return {
    Categories,
  };
};

