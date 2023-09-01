import { type IGenQ_All_SubcategoryQuery } from "../graphql/__generated/sdk";
import { caisySDK } from "../graphql/getSdk";

export interface getAllSubcategories 
{
  Subcategories: IGenQ_All_SubcategoryQuery | null;
}

export const getAllSubcategories = async (): Promise<getAllSubcategories> =>
{
  const Subcategories = await caisySDK.q_all_subcategory();

  return {
    Subcategories,
  };
};
