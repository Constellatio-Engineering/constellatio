import { ClapHands } from "@/components/Icons/ClapHands";
import { ClapHandsFilled } from "@/components/Icons/ClapHandsFilled";
import { UnstyledButton } from "@/components/molecules/unstyledButton/UnstyledButton";

import React, { type FunctionComponent } from "react";

import * as styles from "./UpvoteButton.styles";

type Props = {
  readonly isLoading: boolean;
  readonly isUpvoted: boolean;
  readonly onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  readonly upvotesCount: number;
};

const UpvoteButton: FunctionComponent<Props> = ({
  isLoading,
  isUpvoted,
  onClick,
  upvotesCount
}) => 
{
  return (
    <div css={styles.wrapper}>
      <UnstyledButton onClick={onClick} disabled={isLoading}>
        {isUpvoted ? <ClapHandsFilled size={24}/> : <ClapHands size={24}/>}
      </UnstyledButton>
      <p css={styles.counter}>{upvotesCount}</p>
    </div>
  );
};

export default UpvoteButton;
