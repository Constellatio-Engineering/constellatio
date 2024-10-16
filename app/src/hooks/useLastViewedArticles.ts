import useArticles from "@/hooks/useArticles";
import { api } from "@/utils/api";

export const useLastViewedArticles = () =>
{
  const {
    data: lastViewedArticles = [],
    error: getLastViewedArticlesError,
    isLoading: isGetLastViewedArticlesLoading
  } = api.views.getLastViewedContentItems.useQuery({ itemType: "article" });
  const { allArticles, error: getArticlesError, isLoading: isGetAllArticlesLoading } = useArticles();

  const articles = lastViewedArticles
    .map(({ itemId, viewedDate }) =>
    {
      const article = allArticles.find(({ id }) => id === itemId);

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
