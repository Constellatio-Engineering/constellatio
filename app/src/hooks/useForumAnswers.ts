import { api } from "@/utils/api";

export const useForumAnswers = (questionId: string) =>
{
  return api.forum.getAnswers.useQuery({ questionId }, {
    refetchOnMount: "always",
    staleTime: Infinity,
  });
};
