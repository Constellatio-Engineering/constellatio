import { defaultLimit } from "@/components/pages/forumOverviewPage/ForumOverviewPage";
import { api } from "@/utils/api";

export const useForumQuestionDetails = (questionId: string) =>
{
  const apiContext = api.useUtils();

  return api.forum.getQuestionById.useQuery({ questionId }, {
    initialData: () =>
    {
      // There seems to be a bug with the types where cursor is required for getInfiniteData, but it is not (taken from the docs)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const getQuestionsCacheData = apiContext.forum.getQuestions.getInfiniteData({ limit: defaultLimit });
      const questionsFromCache = getQuestionsCacheData?.pages.flatMap((page) => page?.questions ?? []) ?? [];
      return questionsFromCache.find((question) => question.id === questionId);
    },
    staleTime: Infinity,
  });
};
