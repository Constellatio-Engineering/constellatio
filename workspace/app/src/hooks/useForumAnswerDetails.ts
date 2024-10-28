import { type GetAnswersSchema } from "@/schemas/forum/getAnswers.schema";
import { useForumPageStore } from "@/stores/forumPage.store";
import { api } from "@/utils/api";

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
