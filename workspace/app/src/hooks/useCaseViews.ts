import { api } from "@/utils/api";
import { type Nullable, type UseQueryResult } from "@/utils/types";

type UseCaseViews = (caseId: Nullable<string>, isEnabled: boolean) => UseQueryResult<{ count: number }>;

const useCaseViews: UseCaseViews = (caseId, isEnabled) =>
{
  const { data: caseViews = 0, error, isLoading } = api.views.getContentItemViewsCount.useQuery({ itemId: caseId!, itemType: "case" }, {
    enabled: caseId != null && isEnabled,
  });

  return {
    count: caseViews,
    error,
    isLoading
  };
};

export default useCaseViews;