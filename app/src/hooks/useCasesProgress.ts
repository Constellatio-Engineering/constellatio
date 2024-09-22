import { type AppRouter } from "@/server/api/root";
import { type GetCasesProgressResult } from "@/server/api/routers/caseProgress.router";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

import { type inferProcedureInput } from "@trpc/server";

const useCasesProgress = (options?: inferProcedureInput<AppRouter["casesProgress"]["getCasesProgress"]>) =>
{
  const { data: casesProgress, error, isLoading } = api.casesProgress.getCasesProgress.useQuery(options);

  return {
    casesProgress,
    error,
    isLoading
  };
};

export default useCasesProgress;
