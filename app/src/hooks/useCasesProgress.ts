import { type AppRouter } from "@/server/api/root";
import { type GetCasesProgressResult } from "@/server/api/routers/caseProgress.router";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

import { type inferProcedureInput } from "@trpc/server";

type UseCasesProgress = (options?: inferProcedureInput<AppRouter["casesProgress"]["getCasesProgress"]>) => UseQueryResult<{ casesProgress: GetCasesProgressResult | undefined }>;

const useCasesProgress: UseCasesProgress = (options) =>
{
  const { data: casesProgress, error, isLoading } = api.casesProgress.getCasesProgress.useQuery(options);

  return {
    casesProgress,
    error,
    isLoading
  };
};

export default useCasesProgress;
