import Tag from "@/components/atoms/tag/Tag";
import BookmarkButton from "@/components/organisms/caseBlock/BookmarkButton/BookmarkButton";
import { TagsSkeleton } from "@/components/pages/forumOverviewPage/questionsSkeleton/QuestionsSkeleton";
import QuestionUpvoteButton from "@/components/pages/forumOverviewPage/questionUpvoteButton/QuestionUpvoteButton";
import { type ForumAnswer } from "@/db/schema";

import { Title, TypographyStylesProvider } from "@mantine/core";
import Image from "next/image";
import React, { type FunctionComponent } from "react";

import * as styles from "./AnswerListItem.styles";
import genericProfileIcon from "../../../../../public/images/icons/generic-user-icon.svg";

type Props = ForumAnswer;

const AnswerListItem: FunctionComponent<Props> = ({ createdAt, text, updatedAt }) => 
{
  return (
    <div css={styles.wrapper}>
      <div css={styles.upvoteColumn}>
        <QuestionUpvoteButton
          isUpvoted={question.isUpvoted}
          questionId={question.id}
          upvotesCount={question.upvotesCount}
        />
      </div>
      {/* <div css={styles.contentColumn}>
        <div css={styles.authorAndDateWrapper}>
          <div css={styles.authorWrapper}>
            <Image
              css={styles.profilePicture}
              src={genericProfileIcon.src}
              alt="Avatar"
              width={28}
              height={28}
            />
            <p css={styles.author}>{question.author.username}</p>
          </div>
          <p css={styles.date}>
            {question.createdAt.toLocaleDateString("de", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
            {(question.createdAt.getTime() !== question.updatedAt.getTime()) && " (bearbeitet)"}
          </p>
        </div>
      </div>*/}
      {text}
    </div>
  );
};

export default AnswerListItem;
