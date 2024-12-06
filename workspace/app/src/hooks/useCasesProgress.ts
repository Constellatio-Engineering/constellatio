import { api } from "@/utils/api";

import { type AppRouter } from "@constellatio/api";
import { type inferReactQueryProcedureOptions } from "@trpc/react-query";
import { type inferProcedureInput } from "@trpc/server";

const useCasesProgress = (
  input?: inferProcedureInput<AppRouter["casesProgress"]["getCasesProgress"]>,
  options?: inferReactQueryProcedureOptions<AppRouter>["casesProgress"]["getCasesProgress"]
) =>
{
  return api.casesProgress.getCasesProgress.useQuery(input, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export default useCasesProgress;
