import { type IGenCase } from "../graphql/__generated/sdk";
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
  const Case = await caisySDK.caseById({ id });
    
  return {
    Case: Case?.Case || null,
  };
};
