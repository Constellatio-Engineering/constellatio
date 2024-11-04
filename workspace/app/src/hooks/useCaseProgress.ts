import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

import { type GetCaseProgressResult } from "@constellatio/api/routers/caseProgress.router";
import { type Nullable } from "@constellatio/utility-types";

type UseCaseProgress = (caseId: Nullable<string>) => UseQueryResult<{ caseProgress: GetCaseProgressResult | undefined }>;

const useCaseProgress: UseCaseProgress = (caseId) =>
{
  const { data: caseProgress, error, isLoading } = api.casesProgress.getCaseProgress.useQuery({ caseId: caseId! }, {
    enabled: caseId != null,
  });

  return {
    caseProgress,
    error,
    isLoading
  };
};

export default useCaseProgress;
