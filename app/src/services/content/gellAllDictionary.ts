/* eslint-disable @typescript-eslint/naming-convention */
import { type IGenGetAllDictionaryQuery } from "../graphql/__generated/sdk";
import { caisySDK } from "../graphql/getSdk";

// export type allCases = IGenCaseOverviewFragment[] & {
//   __typename?: "Dictionary" | undefined;
// };

const getAllDictionary = async (): Promise<IGenGetAllDictionaryQuery> => 
{
  try 
  {
    const allDectionaryRes = await caisySDK.getAllDictionary();
    return allDectionaryRes;
    
  } 
  catch (error)
  {
    console.error("error at getting all Dictionary", error);
    throw error;
  }
   
};

export default getAllDictionary;
