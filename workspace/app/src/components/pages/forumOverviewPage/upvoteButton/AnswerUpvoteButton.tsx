import UpvoteButton from "@/components/pages/forumOverviewPage/upvoteButton/UpvoteButton";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { api } from "@/utils/api";

import { type AppRouter } from "@constellatio/api";
import { type Nullable } from "@constellatio/utility-types";
import { notifications } from "@mantine/notifications";
import { type inferProcedureOutput } from "@trpc/server";
import React, { type FunctionComponent } from "react";

type MutationContext = {
  readonly answerBackup: Nullable<inferProcedureOutput<AppRouter["forum"]["getAnswerById"]>>;
};

type Props = { 
  readonly answerId: string;
  readonly authorId: string;
  readonly isUpvoted: boolean;
  readonly upvotesCount: number;
};

const AnswerUpvoteButton: FunctionComponent<Props> = ({
  answerId,
  authorId,
  isUpvoted,
  upvotesCount
}) =>
{
  const { invalidateForumAnswer } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const apiContext = api.useUtils();

  const onUpvoteMutationSuccess = async (): Promise<void> =>
  {
    await invalidateForumAnswer({ answerId });
  };

  const onUpvoteMutationError = (_err: unknown, _upvotedAnswer: unknown, context: MutationContext | undefined): void =>
  {
    notifications.show({
      color: "red",
      message: "Bitte versuche es später erneut oder kontaktiere unseren Support.",
      title: "Da ist leider etwas schief gelaufen"
    });

    const answerBackup = context?.answerBackup;

    if(!answerBackup)
    {
      console.error("answerBackup undefined after upvote mutation error");
      return;
    }

    apiContext.forum.getAnswerById.setData({ answerId }, answerBackup);
  };

  const onVoteMutationStart = async (action: "upvote" | "removeUpvote"): Promise<MutationContext> =>
  {
    await apiContext.forum.getAnswerById.cancel({ answerId });
    const answerBackup = apiContext.forum.getAnswerById.getData({ answerId });

    apiContext.forum.getAnswerById.setData({ answerId }, (oldAnswer) =>
    {
      if(!oldAnswer)
      {
        return oldAnswer;
      }

      const updatedAnswer: inferProcedureOutput<AppRouter["forum"]["getAnswerById"]> = {
        ...oldAnswer,
        isUpvoted: action === "upvote",
        upvotesCount: oldAnswer.upvotesCount + (action === "upvote" ? 1 : -1)
      };

      return updatedAnswer;
    });

    return { answerBackup };
  };

  const { isPending: isUpvoteAnswerLoading, mutate: upvoteAnswer } = api.forum.upvoteAnswer.useMutation({
    onError: onUpvoteMutationError,
    onMutate: async () => onVoteMutationStart("upvote"),
    onSuccess: onUpvoteMutationSuccess
  });

  const { isPending: isRemoveUpvoteLoading, mutate: removeAnswerUpvote } = api.forum.removeAnswerUpvote.useMutation({
    onError: onUpvoteMutationError,
    onMutate: async () => onVoteMutationStart("removeUpvote"),
    onSuccess: onUpvoteMutationSuccess
  });

  const onClick = (e: React.MouseEvent<HTMLButtonElement>): void =>
  {
    e.stopPropagation();

    if(isUpvoted)
    {
      removeAnswerUpvote({ answerId });
    }
    else
    {
      upvoteAnswer({ answerId });
    }
  };

  return (
    <UpvoteButton
      authorId={authorId}
      onClick={onClick}
      isUpvoted={isUpvoted}
      upvotesCount={upvotesCount}
      isLoading={isUpvoteAnswerLoading || isRemoveUpvoteLoading}
    />
  );
};

export default AnswerUpvoteButton;
