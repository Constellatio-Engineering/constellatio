import { api } from "@/utils/api";
import { type Nullable, type UseQueryResult } from "@/utils/types";

type UseArticleViews = (articleId: Nullable<string>, isEnabled: boolean) => UseQueryResult<{ count: number }>;

const useArticleViews: UseArticleViews = (articleId, isEnabled) =>
{
  const {
    data: articleViews = 0,
    error,
    isLoading
  } = api.views.getContentItemViewsCount.useQuery({ itemId: articleId!, itemType: "article" }, {
    enabled: articleId != null && isEnabled,
  });

  return {
    count: articleViews,
    error,
    isLoading
  };
};

export default useArticleViews;