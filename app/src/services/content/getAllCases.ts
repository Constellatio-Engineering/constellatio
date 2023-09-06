/* eslint-disable @typescript-eslint/naming-convention */
import { type IGenCaseOverviewFragment } from "../graphql/__generated/sdk";
import { caisySDK } from "../graphql/getSdk";

export type allCases = IGenCaseOverviewFragment[] & {
  __typename?: "Case" | undefined;
};

const getAllCases = async ({ after, allCases = [] }: {
  after?: string;
  allCases?: allCases;
}): Promise<allCases> => 
{
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

export default getAllCases;
