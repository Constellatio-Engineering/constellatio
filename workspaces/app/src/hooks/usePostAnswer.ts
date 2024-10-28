import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { type AppRouter } from "@/server/api/root";
import { api } from "@/utils/api";

import { notifications } from "@mantine/notifications";
import { type inferProcedureOutput } from "@trpc/server";

import useContextAndErrorIfNull from "./useContextAndErrorIfNull";

type Params = {
  onError?: (error: unknown) => void;
  onSettled?: () => void;
  onSuccess?: (data: inferProcedureOutput<AppRouter["forum"]["postAnswer"]>) => void;
};

export const usePostAnswer = (params?: Params) =>
{
  const { invalidateForumAnswers } = useContextAndErrorIfNull(InvalidateQueriesContext);

  return api.forum.postAnswer.useMutation({
    onError: params?.onError,
    onSettled: params?.onSettled,
    onSuccess: async (data, variables, _context) =>
    {
      const { parent } = variables;

      if(parent.parentType === "question")
      {
        await invalidateForumAnswers({
          parent: {
            parentType: "question",
            questionId: parent.questionId
          },
        });
      }
      else
      {
        await invalidateForumAnswers({
          parent: {
            answerId: parent.answerId,
            parentType: "answer"
          },
        });
      }

      notifications.show({
        color: "green",
        message: "Die Antwort wurde erfolgreich veröffentlicht",
        title: "Antwort veröffentlicht"
      });

      params?.onSuccess?.(data);
    },
  });
};
