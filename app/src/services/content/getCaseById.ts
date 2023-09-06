import { type IGenCase } from "../graphql/__generated/sdk";
import { caisySDK } from "../graphql/getSdk";

export interface getAllSubcategories 
{
  Case: IGenCase | null;
}

export const getCaseById = async ({ id }: {id: string}): Promise<getAllSubcategories> =>
{
  const { Case } = await caisySDK.getCaseById({ id });
    
  return {
    Case: Case || null,
  };
};
