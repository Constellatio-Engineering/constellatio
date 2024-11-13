import { api } from "@/utils/api";

import { type AppRouter } from "@constellatio/api";
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
