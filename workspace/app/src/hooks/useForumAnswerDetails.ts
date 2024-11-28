import { useForumPageStore } from "@/stores/forumPage.store";
import { api } from "@/utils/api";

import { type GetAnswersSchema } from "@constellatio/schemas/routers/forum/getAnswers.schema";

export const useForumAnswerDetails = ({ answerId, parent }: {answerId: string; parent: GetAnswersSchema["parent"]}) =>
{
  const apiContext = api.useUtils();

  return api.forum.getAnswerById.useQuery({ answerId }, {
    initialData: () =>
    {
      const existingAnswersInCache = apiContext.forum.getAnswers.getData({
        parent,
        sortBy: useForumPageStore.getState().answersSorting
      });

      return existingAnswersInCache?.find((answer) => answer.id === answerId);
    },
    staleTime: Infinity,
  });
};
