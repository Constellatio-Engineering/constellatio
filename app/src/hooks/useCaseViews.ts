import { api } from "@/utils/api";
import { type Nullable, type UseQueryResult } from "@/utils/types";

type UseCaseViews = (caseId: Nullable<string>) => UseQueryResult<{ count: number }>;

const useCaseViews: UseCaseViews = (caseId) =>
{
  const { data: caseViews = 0, error, isLoading } = api.views.getContentItemViewsCount.useQuery({ itemId: caseId!, itemType: "case" }, {
    enabled: caseId != null,
  });

  return {
    count: caseViews,
    error,
    isLoading
  };
};

export default useCaseViews;
