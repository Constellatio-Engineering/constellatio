import AnswerUpvoteButton from "@/components/pages/forumOverviewPage/upvoteButton/AnswerUpvoteButton";
import ForumItemAuthor from "@/components/pages/forumQuestionDetailPage/forumItemAuthor/ForumItemAuthor";
import { useForumAnswerDetails } from "@/hooks/useForumAnswerDetails";
import type { GetAnswersSchema } from "@/schemas/forum/getAnswers.schema";

import { TypographyStylesProvider } from "@mantine/core";
import Image from "next/image";
import React, { type FunctionComponent, type ReactNode } from "react";

import * as styles from "./AnswerListItem.styles";
import genericProfileIcon from "../../../../../public/images/icons/generic-user-icon.svg";
import ForumListItem from "../../forumOverviewPage/forumListItem/ForumListItem";

type Props = {
  readonly answerId: string;
  readonly children?: ReactNode;
  readonly isMarkedAsCorrect?: boolean;
  readonly parent: GetAnswersSchema["parent"];
};

const AnswerListItem: FunctionComponent<Props> = ({
  answerId,
  children,
  isMarkedAsCorrect,
  parent
}) =>
{
  const {
    data: answer,
    isFetching,
    isLoading,
    isPending
  } = useForumAnswerDetails({ answerId, parent });

  console.log("AnswerListItem", { isFetching, isLoading, isPending });

  if(isLoading)
  {
    return <p>Loading...</p>;
  }

  if(answer == null)
  {
    return <p>Answer not found</p>;
  }

  return (
    <ForumListItem isMarkedAsCorrect={isMarkedAsCorrect}>
      <div css={styles.wrapper}>
        <div css={styles.upvoteColumn}>
          <AnswerUpvoteButton
            authorId={answer.author.id}
            isUpvoted={answer.isUpvoted}
            answerId={answer.id}
            upvotesCount={answer.upvotesCount}
          />
        </div>
        <div css={styles.contentColumn}>
          <div css={styles.authorAndDateWrapper}>
            <ForumItemAuthor
              username={answer.author.username}
              userId={answer.author.id}
              profilePicture={undefined}
            />
            <p css={styles.date}>
              {answer.createdAt.toLocaleDateString("de", {
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                month: "short",
                year: "numeric",
              })}{" "}Uhr
              {(answer.createdAt.getTime() !== answer.updatedAt.getTime()) && " (bearbeitet)"}
            </p>
          </div>
          <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: answer.text }}/>
          </TypographyStylesProvider>
          {children && (
            <div css={styles.childrenWrapper}>
              {children}
            </div>
          )}
        </div>
      </div>
    </ForumListItem>
  );
};

export default AnswerListItem;
