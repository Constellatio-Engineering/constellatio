import useArticles from "@/hooks/useArticles";
import { type IGenArticle } from "@/services/graphql/__generated/sdk";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

type UseLastViewedArticles = () => UseQueryResult<{ lastViewedArticles: IGenArticle[] }>;

export const useLastViewedArticles: UseLastViewedArticles = () =>
{
  const {
    data: lastViewedArticlesIds = [],
    error: getLastViewedArticlesError,
    isLoading: isGetLastViewedArticlesLoading
  } = api.views.getLastViewedArticles.useQuery();
  const { allArticles, error: getArticlesError, isLoading: isGetAllArticlesLoading } = useArticles();
  const lastViewedArticles: IGenArticle[] = lastViewedArticlesIds
    .map((lastViewedArticleId) => allArticles.find(({ id }) => id === lastViewedArticleId))
    .filter(Boolean);

  return {
    error: getLastViewedArticlesError || getArticlesError,
    isLoading: isGetLastViewedArticlesLoading || isGetAllArticlesLoading,
    lastViewedArticles,
  };
};
