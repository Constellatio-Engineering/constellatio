/* eslint-disable @typescript-eslint/naming-convention */
import { sortArticlesByTopic } from "@/utils/articles";

import getAllArticles from "./getAllArticles";
import {
  type IGenArticle,
  type IGenGetAllLegalAreaQuery,
  type IGenMainCategory,
} from "../graphql/__generated/sdk";
import { caisySDK } from "../graphql/getSdk";

export type IMainCategory = IGenMainCategory & { casesPerCategory: number };
export type ArticleWithNextAndPreviousArticleId = IGenArticle & {
  nextArticleId: string | null;
  previousArticleId: string | null;
};
export interface IArticlesOverviewProps 
{
  __typename: "dictionary";
  allArticles: ArticleWithNextAndPreviousArticleId[];
  allLegalAreaRes: IGenGetAllLegalAreaQuery;
  allMainCategories: IMainCategory[];
}

const getArticlesOverviewProps = async (): Promise<IArticlesOverviewProps> => 
{
  try 
  {
    const [allMainCategoriesRes, allLegalAreaRes, allArticlesRes] = await Promise.all([
      caisySDK.getAllMainCategory(),
      caisySDK.getAllLegalArea(), 
      getAllArticles()
    ]);

    const allMainCategories: IArticlesOverviewProps["allMainCategories"] = (allMainCategoriesRes?.allMainCategory?.edges?.map((category) =>
    {
      return ({
        ...category?.node,
        casesPerCategory: allArticlesRes?.filter((articleItem) => articleItem?.mainCategoryField?.[0]?.id === category?.node?.id)?.length ?? 0,
      });
    })) || [];

    const articlesGroupedByLegalArea: {
      [legalAreaId: string]: IGenArticle[];
    } = {};

    for(const article of allArticlesRes) 
    {
      const legalAreaId = article.legalArea?.id;

      if(legalAreaId == null)
      {
        continue;
      }

      if(!articlesGroupedByLegalArea[legalAreaId])
      {
        articlesGroupedByLegalArea[legalAreaId] = [];
      }

      articlesGroupedByLegalArea[legalAreaId]!.push(article);
    }

    Object.keys(articlesGroupedByLegalArea).forEach((legalAreaId) =>
    {
      articlesGroupedByLegalArea[legalAreaId]!.sort((sortArticlesByTopic));
    });

    const articlesWithNextAndPreviousArticleId = allArticlesRes.map((article) => 
    {
      const legalAreaId = article.legalArea?.id;

      if(!legalAreaId)
      {
        return ({
          ...article,
          nextArticleId: null,
          previousArticleId: null,
        });
      }

      const articlesInLegalArea = articlesGroupedByLegalArea[legalAreaId]!;
      const articleIndex = articlesInLegalArea.findIndex((a) => a.id === article.id);

      const nextArticleId = articleIndex < articlesInLegalArea.length - 1
        ? articlesInLegalArea[articleIndex + 1]!.id
        : null;

      const previousArticleId = articleIndex > 0
        ? articlesInLegalArea[articleIndex - 1]!.id
        : null;

      return {
        ...article,
        nextArticleId: nextArticleId ?? null,
        previousArticleId: previousArticleId ?? null,
      };
    });

    return {
      __typename: "dictionary",
      allArticles: articlesWithNextAndPreviousArticleId,
      allLegalAreaRes,
      allMainCategories,
    };
  }
  catch (error) 
  {
    console.error("Error fetching dictionary overview props:", error);
    throw error;
  }
};

export default getArticlesOverviewProps;
