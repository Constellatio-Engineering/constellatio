import { type GetAnswersSchema } from "@/schemas/forum/getAnswers.schema";
import { api } from "@/utils/api";

export const useForumAnswerDetails = ({ answerId, parent }: {answerId: string; parent: GetAnswersSchema["parent"]}) =>
{
  const apiContext = api.useUtils();

  return api.forum.getAnswerById.useQuery({ answerId }, {
    initialData: () =>
    {
      return apiContext.forum.getAnswers.getData({ parent })?.find((answer) => answer.id === answerId);
    },
    staleTime: Infinity,
  });
};
