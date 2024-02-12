import { type AppRouter } from "@/server/api/root";
import { api } from "@/utils/api";

import { type inferProcedureInput } from "@trpc/server";

type Params = inferProcedureInput<AppRouter["forum"]["getAnswers"]>;

export const useForumAnswers = (params: Params) =>
{
  return api.forum.getAnswers.useQuery(params, {
    refetchOnMount: "always",
    staleTime: Infinity,
  });
};
