import { ClapHands } from "@/components/Icons/ClapHands";
import { UnstyledButton } from "@/components/molecules/unstyledButton/UnstyledButton";
import { api } from "@/utils/api";

import React, { type FunctionComponent } from "react";

import * as styles from "./QuestionUpvoteButton.styles";

type Props = {
  readonly isUpvoted: boolean;
  readonly questionId: string;
  readonly upvotesCount: number;
};

const QuestionUpvoteButton: FunctionComponent<Props> = ({ isUpvoted, questionId, upvotesCount }) =>
{
  const { isLoading: isUpvoteQuestionLoading, mutate: upvoteQuestion } = api.forum.upvoteQuestion.useMutation({
    onError: (error) => console.log(error),
    onSuccess: (data) => console.log("success")
  });

  const { isLoading: isRemoveUpvoteLoading, mutate: removeQuestionUpvote } = api.forum.removeQuestionUpvote.useMutation({
    onError: (error) => console.log(error),
    onSuccess: (data) => console.log("success")
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
        <ClapHands size={24}/>
      </UnstyledButton>
      <p css={styles.counter}>{upvotesCount}</p>
    </div>
  );
};

export default QuestionUpvoteButton;
