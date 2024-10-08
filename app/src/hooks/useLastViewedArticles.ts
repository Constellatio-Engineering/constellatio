import useArticles from "@/hooks/useArticles";
import { type IGenArticle } from "@/services/graphql/__generated/sdk";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

export const useLastViewedArticles = () =>
{
  const {
    data: lastViewedArticles = [],
    error: getLastViewedArticlesError,
    isLoading: isGetLastViewedArticlesLoading
  } = api.views.getLastViewedArticles.useQuery();
  const { allArticles, error: getArticlesError, isLoading: isGetAllArticlesLoading } = useArticles();

  const articles = lastViewedArticles
    .map(({ articleId, viewedDate }) =>
    {
      const article = allArticles.find(({ id }) => id === articleId);

      if(!article)
      {
        return null;
      }

      return {
        ...article,
        viewedDate,
      };
    })
    .filter(Boolean);

  return {
    error: getLastViewedArticlesError || getArticlesError,
    isLoading: isGetLastViewedArticlesLoading || isGetAllArticlesLoading,
    lastViewedArticles: articles,
  };
};
