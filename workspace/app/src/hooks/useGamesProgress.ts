import { api } from "@/utils/api";

import type { AppRouter } from "@constellatio/api";
import { type inferReactQueryProcedureOptions } from "@trpc/react-query";
import { type inferProcedureInput } from "@trpc/server";

const useGamesProgress = (
  input: inferProcedureInput<AppRouter["gamesProgress"]["getGamesProgress"]>,
  options?: inferReactQueryProcedureOptions<AppRouter>["gamesProgress"]["getGamesProgress"]
) =>
{
  let isEnabled = true;

  if(input.queryType === "byCaseId" && input.caseId == null)
  {
    isEnabled = true;
  }

  return api.gamesProgress.getGamesProgress.useQuery(input, {
    enabled: isEnabled,
    ...options
  });
};

export default useGamesProgress;
