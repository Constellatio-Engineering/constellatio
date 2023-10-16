import { api } from "@/utils/api";
import { type Nullable, type UseQueryResult } from "@/utils/types";

type UseArticleViews = (articleId: Nullable<string>) => UseQueryResult<{ count: number }>;

const useArticleViews: UseArticleViews = (articleId) =>
{
  const { data: articleViews = 0, error, isLoading } = api.views.getArticleViews.useQuery({ articleId: articleId! }, {
    enabled: articleId != null,
  });

  return {
    count: articleViews,
    error,
    isLoading
  };
};

export default useArticleViews;
