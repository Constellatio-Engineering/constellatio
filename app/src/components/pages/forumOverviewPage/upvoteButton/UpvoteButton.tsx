import { ClapHands } from "@/components/Icons/ClapHands";
import { ClapHandsFilled } from "@/components/Icons/ClapHandsFilled";
import { UnstyledButton } from "@/components/molecules/unstyledButton/UnstyledButton";
import useUserDetails from "@/hooks/useUserDetails";

import { Tooltip } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./UpvoteButton.styles";

type Props = {
  readonly authorId: string;
  readonly isLoading: boolean;
  readonly isUpvoted: boolean;
  readonly onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  readonly upvotesCount: number;
};

const UpvoteButton: FunctionComponent<Props> = ({
  authorId,
  isLoading,
  isUpvoted,
  onClick,
  upvotesCount
}) => 
{
  const { isLoading: areUserDetailsLoading, userDetails } = useUserDetails();
  const isCurrentUserAuthor = userDetails?.id === authorId;
  const isTooltipDisabled = areUserDetailsLoading || !isCurrentUserAuthor;

  return (
    <div css={styles.wrapper}>
      <Tooltip
        label={"Du kannst deine eigenen Beiträge nicht upvoten"}
        multiline={true}
        width={200}
        position={"top"}
        withArrow={true}
        disabled={isTooltipDisabled}>
        <UnstyledButton onClick={onClick} disabled={isLoading || areUserDetailsLoading || isCurrentUserAuthor}>
          {isUpvoted ? <ClapHandsFilled size={24}/> : <ClapHands size={24}/>}
        </UnstyledButton>
      </Tooltip>
      <p css={styles.counter}>{upvotesCount}</p>
    </div>
  );
};

export default UpvoteButton;
