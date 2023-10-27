/* eslint-disable @typescript-eslint/naming-convention */
import { type IGenArticle } from "../graphql/__generated/sdk";
import { caisySDK } from "../graphql/getSdk";

export type allArticles = IGenArticle[];

type GetAllArticlesProps = {
  after?: string;
  allArticles?: allArticles;
};

const getAllArticles = async (props?: GetAllArticlesProps): Promise<allArticles> => 
{
  const after = props?.after;
  let allArticles = props?.allArticles || [];

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
        allArticles
      });
    }
    return allArticles;
  }

  catch (error) 
  {
    console.error("error at getting all Articles", error);
    throw error;
  }
};

export default getAllArticles;
