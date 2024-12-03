import { api } from "@/utils/api";

import { type AppRouter } from "@constellatio/api";
import { type inferReactQueryProcedureOptions } from "@trpc/react-query";
import { type inferProcedureInput } from "@trpc/server";

export const useSeenArticles = (
  input?: inferProcedureInput<AppRouter["views"]["getSeenArticles"]>,
  options?: inferReactQueryProcedureOptions<AppRouter>["views"]["getSeenArticles"]
) =>
{
  return api.views.getSeenArticles.useQuery(input, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};
