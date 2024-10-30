import { api } from "@/utils/api";

import { type inferProcedureInput } from "@trpc/server";

import { type AppRouter } from "@/server/api/root";

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
