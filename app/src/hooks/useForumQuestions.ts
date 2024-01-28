import { type AppRouter } from "@/server/api/root";
import { api } from "@/utils/api";

import { type inferReactQueryProcedureOptions } from "@trpc/react-query";
import { type inferProcedureInput } from "@trpc/server";

export const useForumQuestions = (
  params: inferProcedureInput<AppRouter["forum"]["getQuestions"]>,
  options?: inferReactQueryProcedureOptions<AppRouter>["forum"]["getQuestions"],
) => // eslint-disable-line @typescript-eslint/explicit-function-return-type
{
  return api.forum.getQuestions.useQuery(params, {
    refetchOnMount: "always",
    staleTime: Infinity,
    ...options,
  });
};
