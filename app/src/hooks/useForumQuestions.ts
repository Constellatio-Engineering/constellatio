import { type AppRouter } from "@/server/api/root";
import { api } from "@/utils/api";

import { type inferReactQueryProcedureOptions } from "@trpc/react-query";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useForumQuestions = (options?: inferReactQueryProcedureOptions<AppRouter>["forum"]["getQuestions"]) =>
{
  return api.forum.getQuestions.useQuery(undefined, {
    ...options,
    refetchOnMount: "always",
    staleTime: Infinity
  });
};
