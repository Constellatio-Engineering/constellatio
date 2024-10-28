import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { type AppRouter } from "@/server/api/root";
import { api } from "@/utils/api";

import { notifications } from "@mantine/notifications";
import { type inferProcedureOutput } from "@trpc/server";

import useContextAndErrorIfNull from "./useContextAndErrorIfNull";

type Params = {
  onError?: (error: unknown) => void;
  onSettled?: () => void;
  onSuccess?: (data: inferProcedureOutput<AppRouter["forum"]["postQuestion"]>) => void;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const usePostQuestion = (params?: Params) =>
{
  const { invalidateForumQuestions } = useContextAndErrorIfNull(InvalidateQueriesContext);

  return api.forum.postQuestion.useMutation({
    onError: params?.onError,
    onSettled: params?.onSettled,
    onSuccess: async (data) =>
    {
      await invalidateForumQuestions();

      notifications.show({
        color: "green",
        message: "Die Frage wurde erfolgreich veröffentlicht",
        title: "Frage veröffentlicht"
      });

      params?.onSuccess?.(data);
    }
  });
};
