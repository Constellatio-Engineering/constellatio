/* eslint-disable @typescript-eslint/naming-convention */
import getAllArticles, { type allArticles } from "@/services/content/getAllArticles";
import type { IGenArticle } from "@/services/graphql/__generated/sdk";
import { sortArticlesByTopic } from "@/utils/articles";

import getAllCases, { type AllCases } from "./getAllCases";
import { caisySDK } from "../graphql/getSdk";

type ArticleWithNextAndPreviousArticleId = IGenArticle & {
  nextArticleId: string | null;
  previousArticleId: string | null;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getArticlesWithNextAndPreviousArticleId = (allArticles: allArticles): ArticleWithNextAndPreviousArticleId[] =>
{
  const articlesGroupedByLegalArea: {
    [legalAreaId: string]: IGenArticle[];
  } = {};

  for(const article of allArticles)
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

  const articlesWithNextAndPreviousArticleId = allArticles.map((article) =>
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

  return articlesWithNextAndPreviousArticleId;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getOverviewPageProps = async (variant: "case" | "dictionary") =>
{
  const [allMainCategoriesRes, allLegalAreaRes] = await Promise.all([
    caisySDK.getAllMainCategory(),
    caisySDK.getAllLegalArea()
  ]);

  // let allItems: Array<AllCases[number] | ArticleWithNextAndPreviousArticleId>;
  let allItems: AllCases | ArticleWithNextAndPreviousArticleId[];

  if(variant === "case")
  {
    const allCases = await getAllCases();
    allItems = allCases;
  }
  else
  {
    const allArticles = await getAllArticles();
    allItems = getArticlesWithNextAndPreviousArticleId(allArticles);
  }

  const allMainCategories = allMainCategoriesRes?.allMainCategory?.edges
    ?.map((category) => ({
      ...category?.node,
      itemsPerCategory: allItems
        .filter((item) => item?.mainCategoryField?.[0]?.id === category?.node?.id)
        .length,
    }))
    .filter(Boolean)
   || [];

  const allLegalAreas = allLegalAreaRes?.allLegalArea?.edges
    ?.map((legalArea) => legalArea?.node)
    .filter(Boolean)
    || [];

  return {
    allItems,
    allLegalAreas,
    allMainCategories,
    variant,
  };
};

export type GetOverviewPagePropsResult = Awaited<ReturnType<typeof getOverviewPageProps>>;
