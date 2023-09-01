import { type IGenQ_Case_By_IdQuery, type IGenQ_All_SubcategoryQuery, type IGenQ_Case_By_IdQueryVariables, type IGenCase } from "../graphql/__generated/sdk";
import { caisySDK } from "../graphql/getSdk";

export interface getAllSubcategories 
{
  Case: IGenCase | null;
}

interface IQueryVar 
{
  id: string;
}

export const getCaseById = async ({ id }: IQueryVar): Promise<getAllSubcategories> =>
{
  const Case = await caisySDK.q_case_by_id({ id });
    
  return {
    Case: Case?.Case || null,
  };
};
