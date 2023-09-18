/* eslint-disable @typescript-eslint/naming-convention */
import { IGenArticleOverviewFragment, type IGenCaseOverviewFragment } from "../graphql/__generated/sdk";
import { caisySDK } from "../graphql/getSdk";

export type allArticles = IGenArticleOverviewFragment[] & {
  __typename?: "Article" | undefined;
};

const getAllArticles = async ({ after, allArticles = [] }: {
  after?: string;
  allArticles?: allArticles;
}): Promise<allArticles> => 
{
  try 
  {
    const { allArticle } = await caisySDK.getAllArticleOverview({ after });

    allArticle?.edges?.forEach((edge) => 
    {
      if(edge?.node) 
      {
        allArticles = [...allArticles, edge?.node];
      }
    });

    if(allArticle?.pageInfo?.hasNextPage) 
    {
      return await getAllArticles({
        after: allArticle.pageInfo.endCursor!,
      });
    }
    return allArticles;
  }
  catch (error) 
  {
    console.error("error at getting all Cases", error);
    throw error;
  }
};

export default getAllArticles;
