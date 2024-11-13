/* eslint-disable @typescript-eslint/naming-convention */
import { type IGenCaseOverviewFragment } from "../graphql/__generated/sdk";
import { caisySDK } from "../graphql/getSdk";

export type AllCases = Array<IGenCaseOverviewFragment & {
  __typename?: "Case" | undefined;
}>;

type GetAllCasesProps = {
  after?: string;
  allCases?: AllCases;
};

export const getAllCases = async (props?: GetAllCasesProps): Promise<AllCases> =>
{
  const after = props?.after;
  let allCases = props?.allCases || [];

  try 
  {
    const { allCase } = await caisySDK.getAllCaseOverview({ after });

    allCase?.edges?.forEach((edge) => 
    {
      if(edge?.node) 
      {
        allCases = [...allCases, edge?.node];
      }
    });

    if(allCase?.pageInfo?.hasNextPage) 
    {
      return await getAllCases({
        after: allCase.pageInfo.endCursor!,
        allCases
      });
    }
    return allCases;
  }
  catch (error) 
  {
    console.error("error at getting all Cases", error);
    throw error;
  }
};
