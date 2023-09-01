import { type IGenQ_All_CaseQuery } from "../graphql/__generated/sdk";
import { caisySDK } from "../graphql/getSdk";

export interface getAllCasesResult 
{
  Cases: IGenQ_All_CaseQuery | null;
}

export const getAllCases = async (): Promise<getAllCasesResult> => 
{
  const Cases = await caisySDK.q_all_case();

  return {
    Cases,
  };
};
