/* eslint-disable @typescript-eslint/naming-convention */
import { type IGenCaseOverviewFragment } from "../graphql/__generated/sdk";
import { caisySDK } from "../graphql/getSdk";

export type allCases = Array<IGenCaseOverviewFragment & {
  __typename?: "Case" | undefined;
}>;

type GetAllCasesProps = {
  after?: string;
  allCases?: allCases;
};

const getAllCases = async (props?: GetAllCasesProps): Promise<allCases> =>
{
  // console.log("getAllCases", props?.after);

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

    // console.log("fetched cases", allCase?.edges?.map(e => e?.node?.title));
    // console.log("has next page", allCase?.pageInfo?.hasNextPage);

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
