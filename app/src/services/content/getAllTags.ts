/* eslint-disable @typescript-eslint/naming-convention */
import { type IGenTags } from "../graphql/__generated/sdk";
import { caisySDK } from "../graphql/getSdk";

export type AllTags = IGenTags[]; 

type GetAllCasesProps = {
  after?: string;
  allTags?: AllTags;
};

export const getAllTags = async (props?: GetAllCasesProps): Promise<AllTags> =>
{
  const after = props?.after;
  let allTags = props?.allTags || [];

  try 
  {
    const { allTags: _allTags } = await caisySDK.getAllTags({ after });

    _allTags?.edges?.forEach((edge) =>
    {
      if(edge?.node) 
      {
        allTags = [...allTags, edge?.node];
      }
    });

    if(_allTags?.pageInfo?.hasNextPage)
    {
      return await getAllTags({
        after: _allTags.pageInfo.endCursor!,
        allTags
      });
    }
  }
  catch (error) 
  {
    console.error("error at getting all Cases", error);
    throw error;
  }

  allTags.filter(Boolean);

  return allTags;
};
