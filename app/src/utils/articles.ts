import { type allArticles } from "@/services/content/getAllArticles";
import { type IGenArticle } from "@/services/graphql/__generated/sdk";
import { sortByTopic } from "@/utils/caisy";

export type ArticleWithNextAndPreviousArticleId = IGenArticle & {
  nextArticleId: string | null;
  previousArticleId: string | null;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getArticlesWithNextAndPreviousArticleId = (allArticles: allArticles): ArticleWithNextAndPreviousArticleId[] =>
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
    articlesGroupedByLegalArea[legalAreaId]!.sort((sortByTopic));
  });

  const articlesWithNextAndPreviousArticleId: ArticleWithNextAndPreviousArticleId[] = allArticles.map((article) =>
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

    return ({
      ...article,
      nextArticleId: nextArticleId ?? null,
      previousArticleId: previousArticleId ?? null,
    });
  });

  return articlesWithNextAndPreviousArticleId;
};
