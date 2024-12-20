import { api } from "@/utils/api";

import { type AppRouter } from "@constellatio/api";
import { type Question } from "@constellatio/api/routers/forum.router";
import { type inferReactQueryProcedureOptions } from "@trpc/react-query";

type Params = inferReactQueryProcedureOptions<AppRouter>["forum"]["updateQuestion"];

export const useUpdateQuestion = (params?: Params) =>
{
  const apiContext = api.useUtils();

  return api.forum.updateQuestion.useMutation({
    ...params,
    onSuccess: (updatedQuestion, variables, context) =>
    {
      params?.onSuccess?.(updatedQuestion, variables, context);

      if(updatedQuestion == null)
      {
        return;
      }

      apiContext.forum.getQuestionById.setData({ questionId: updatedQuestion.id }, (oldQuestion) =>
      {
        if(!oldQuestion)
        {
          return oldQuestion;
        }

        return {
          ...oldQuestion,
          ...updatedQuestion
        } satisfies Question;
      });
    }
  });
};
