import { api } from "@/utils/api";

import { type AppRouter } from "@constellatio/api";
import { type inferProcedureInput } from "@trpc/server";

type Params = inferProcedureInput<AppRouter["forum"]["getAnswers"]>;

export const useForumAnswers = (params: Params) =>
{
  return api.forum.getAnswers.useQuery(params, {
    refetchOnMount: "always",
    staleTime: Infinity
  });
};
