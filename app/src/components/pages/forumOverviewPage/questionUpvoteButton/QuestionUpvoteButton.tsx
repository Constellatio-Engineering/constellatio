import { ClapHands } from "@/components/Icons/ClapHands";
import { ClapHandsFilled } from "@/components/Icons/ClapHandsFilled";
import { UnstyledButton } from "@/components/molecules/unstyledButton/UnstyledButton";
import { type AppRouter } from "@/server/api/root";
import { api } from "@/utils/api";

import { notifications } from "@mantine/notifications";
import { type inferProcedureInput, type inferProcedureOutput } from "@trpc/server";
import React, { type FunctionComponent } from "react";

import * as styles from "./QuestionUpvoteButton.styles";

type UpvoteQuestionMutationOutput = inferProcedureOutput<AppRouter["forum"]["upvoteQuestion"]>;
type RemoveQuestionUpvoteMutationOutput = inferProcedureOutput<AppRouter["forum"]["removeQuestionUpvote"]>;

type UpvoteQuestionMutationInput = inferProcedureInput<AppRouter["forum"]["upvoteQuestion"]>;
type RemoveQuestionUpvoteMutationInput = inferProcedureInput<AppRouter["forum"]["removeQuestionUpvote"]>;

type MutationContext = {
  readonly previousQuestions: inferProcedureOutput<AppRouter["forum"]["getQuestions"]>;
};

type Props = {
  readonly isUpvoted: boolean;
  readonly questionId: string;
  readonly upvotesCount: number;
};

const QuestionUpvoteButton: FunctionComponent<Props> = ({ isUpvoted, questionId, upvotesCount }) =>
{
  const utils = api.useUtils();

  const onUpvoteMutationSuccess = (updatedQuestion: UpvoteQuestionMutationOutput | RemoveQuestionUpvoteMutationOutput): void =>
  {
    if(!updatedQuestion)
    {
      console.error("updated question is undefined after upvote mutation");
      notifications.show({
        autoClose: false,
        color: "red",
        message: "Bitte laden Sie die Seite neu und versuche es erneut.",
        title: "Da ist etwas schief gelaufen"
      });
      return;
    }

    /* utils.forum.getQuestions.setInfiniteData(undefined, (oldQuestions = []) =>
    {
      const updatedQuestions = oldQuestions.map((question) =>
      {
        if(question.id !== updatedQuestion.id)
        {
          return question;
        }
        return { ...question, ...updatedQuestion };
      });

      return updatedQuestions;
    });*/
  };

  const onUpvoteMutationError = (_err: unknown, _upvotedQuestion: unknown, context: MutationContext | undefined): void =>
  {
    notifications.show({
      color: "red",
      message: "Bitte versuche es später erneut oder kontaktiere unseren Support.",
      title: "Da ist leider etwas schief gelaufen"
    });

    const previousQuestions = context?.previousQuestions;

    if(!previousQuestions)
    {
      console.error("previous questions are undefined after upvote mutation error");
      return;
    }

    // utils.forum.getQuestions.setData(undefined, previousQuestions);
  };

  /* const onVoteMutationStart = async (votedQuestion: UpvoteQuestionMutationInput | RemoveQuestionUpvoteMutationInput, action: "upvote" | "removeUpvote"): Promise<MutationContext> =>
  {
    await utils.forum.getQuestions.cancel();
    const previousQuestions = utils.forum.getQuestions.getData();

    /!* utils.forum.getQuestions.setData(undefined, (oldQuestions = []) =>
    {
      const index = oldQuestions.findIndex((question) => question.id === votedQuestion.questionId);

      if(index === -1)
      {
        return oldQuestions;
      }

      const updatedQuestion: inferProcedureOutput<AppRouter["forum"]["getQuestions"]>[0] = {
        ...oldQuestions[index]!,
        isUpvoted: action === "upvote",
        upvotesCount: oldQuestions[index]!.upvotesCount + (action === "upvote" ? 1 : -1)
      };

      const updatedQuestions = [
        ...oldQuestions.slice(0, index),
        updatedQuestion,
        ...oldQuestions.slice(index + 1),
      ];

      return updatedQuestions;
    });*!/

    return { previousQuestions: previousQuestions ?? [] } satisfies MutationContext;
  };*/

  const { isLoading: isUpvoteQuestionLoading, mutate: upvoteQuestion } = api.forum.upvoteQuestion.useMutation({
    onError: onUpvoteMutationError,
    // onMutate: async (votedQuestion) => onVoteMutationStart(votedQuestion, "upvote"),
    onSuccess: onUpvoteMutationSuccess
  });

  const { isLoading: isRemoveUpvoteLoading, mutate: removeQuestionUpvote } = api.forum.removeQuestionUpvote.useMutation({
    onError: onUpvoteMutationError,
    // onMutate: async (votedQuestion) => onVoteMutationStart(votedQuestion, "removeUpvote"),
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
