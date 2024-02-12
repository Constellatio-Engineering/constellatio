import { api } from "@/utils/api";

export const useForumAnswerReplies = (answerId: string) =>
{
  return api.forum.getAnswerReplies.useQuery({ answerId }, {
    refetchOnMount: "always",
    staleTime: Infinity,
  });
};
