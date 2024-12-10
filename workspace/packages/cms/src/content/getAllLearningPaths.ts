/* eslint-disable @typescript-eslint/naming-convention */
import { type IGenLearningPath } from "../graphql/__generated/sdk";
import { caisySDK } from "../graphql/getSdk";

export type AllLearningPaths = IGenLearningPath[];

type GetAllLearningPathsProps = {
  after?: string;
  allLearningPaths?: AllLearningPaths;
};

export const getAllLearningPaths = async (props?: GetAllLearningPathsProps): Promise<AllLearningPaths> =>
{
  const after = props?.after;
  let allLearningPaths = props?.allLearningPaths || [];

  try 
  {
    const getAllLearningPathsResult = await caisySDK.getAllLearningPaths({ after });

    getAllLearningPathsResult?.allLearningPath?.edges?.forEach((edge) =>
    {
      if(edge?.node) 
      {
        allLearningPaths = [...allLearningPaths, edge?.node];
      }
    });

    if(getAllLearningPathsResult?.allLearningPath?.pageInfo?.hasNextPage)
    {
      return await getAllLearningPaths({
        after: getAllLearningPathsResult?.allLearningPath.pageInfo.endCursor ?? undefined,
        allLearningPaths
      });
    }

    return allLearningPaths;
  }
  catch (error) 
  {
    console.error("error at getting all Learning Paths", error);
    throw error;
  }
};
