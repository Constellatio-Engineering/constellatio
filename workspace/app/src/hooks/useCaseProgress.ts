import { api } from "@/utils/api";
import { type Nullable, type UseQueryResult } from "@/utils/types";

import { type GetCaseProgressResult } from "@/server/api/routers/caseProgress.router";

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
