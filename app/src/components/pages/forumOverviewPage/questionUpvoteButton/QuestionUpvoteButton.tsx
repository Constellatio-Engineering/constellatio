import { ClapHands } from "@/components/Icons/ClapHands";
import { ClapHandsFilled } from "@/components/Icons/ClapHandsFilled";
import { UnstyledButton } from "@/components/molecules/unstyledButton/UnstyledButton";
import { type AppRouter } from "@/server/api/root";
import { api } from "@/utils/api";

import { notifications } from "@mantine/notifications";
import { type inferProcedureOutput } from "@trpc/server";
import React, { type FunctionComponent } from "react";

import * as styles from "./QuestionUpvoteButton.styles";

type MutationContext = {
  readonly questionBackup: inferProcedureOutput<AppRouter["forum"]["getQuestionById"]>;
};

type Props = {
  readonly isUpvoted: boolean;
  readonly questionId: string;
  readonly upvotesCount: number;
};

const QuestionUpvoteButton: FunctionComponent<Props> = ({ isUpvoted, questionId, upvotesCount }) =>
{
  const apiContext = api.useUtils();

  const onUpvoteMutationSuccess = async (): Promise<void> =>
  {
    return apiContext.forum.getQuestionById.invalidate({ questionId });
  };

  const onUpvoteMutationError = (_err: unknown, _upvotedQuestion: unknown, context: MutationContext | undefined): void =>
  {
    notifications.show({
      color: "red",
      message: "Bitte versuche es später erneut oder kontaktiere unseren Support.",
      title: "Da ist leider etwas schief gelaufen"
    });

    const questionBackup = context?.questionBackup;

    if(!questionBackup)
    {
      console.error("questionBackup undefined after upvote mutation error");
      return;
    }

    apiContext.forum.getQuestionById.setData({ questionId }, questionBackup);
  };

  const onVoteMutationStart = async (action: "upvote" | "removeUpvote"): Promise<MutationContext> =>
  {
    await apiContext.forum.getQuestionById.cancel({ questionId });
    const questionBackup = apiContext.forum.getQuestionById.getData({ questionId });

    apiContext.forum.getQuestionById.setData({ questionId }, (oldQuestion) =>
    {
      if(!oldQuestion)
      {
        return oldQuestion;
      }

      const updatedQuestion: inferProcedureOutput<AppRouter["forum"]["getQuestionById"]> = {
        ...oldQuestion,
        isUpvoted: action === "upvote",
        upvotesCount: oldQuestion.upvotesCount + (action === "upvote" ? 1 : -1)
      };

      return updatedQuestion;
    });

    return { questionBackup };
  };

  const { isPending: isUpvoteQuestionLoading, mutate: upvoteQuestion } = api.forum.upvoteQuestion.useMutation({
    onError: onUpvoteMutationError,
    onMutate: async () => onVoteMutationStart("upvote"),
    onSuccess: onUpvoteMutationSuccess
  });

  const { isPending: isRemoveUpvoteLoading, mutate: removeQuestionUpvote } = api.forum.removeQuestionUpvote.useMutation({
    onError: onUpvoteMutationError,
    onMutate: async () => onVoteMutationStart("removeUpvote"),
    onSuccess: onUpvoteMutationSuccess
  });

  const onClick = (): void =>
  {
    if(isUpvoted)
    {
      removeQuestionUpvote({ questionId });
    }
    else
    {
      upvoteQuestion({ questionId });
    }
  };

  return (
    <div css={styles.wrapper}>
      <UnstyledButton onClick={onClick} disabled={isUpvoteQuestionLoading || isRemoveUpvoteLoading}>
        {isUpvoted ? <ClapHandsFilled size={24}/> : <ClapHands size={24}/>}
      </UnstyledButton>
      <p css={styles.counter}>{upvotesCount}</p>
    </div>
  );
};

export default QuestionUpvoteButton;
