import Tag from "@/components/atoms/tag/Tag";
import { Chat } from "@/components/Icons/Chat";
import { Check } from "@/components/Icons/Check";
import BookmarkButton from "@/components/organisms/caseBlock/BookmarkButton/BookmarkButton";
import QuestionUpvoteButton from "@/components/pages/forumOverviewPage/questionUpvoteButton/QuestionUpvoteButton";
import useBookmarks from "@/hooks/useBookmarks";
import { type getQuestionsResult } from "@/server/api/routers/forum.router";
import { removeHtmlTagsFromString } from "@/utils/utils";

import { Title } from "@mantine/core";
import Image from "next/image";
import React, { type FunctionComponent } from "react";

import * as styles from "./QuestionListItem.styles";
import genericProfileIcon from "../../../../../public/images/icons/generic-user-icon.svg";

type Props = {
  readonly question: getQuestionsResult["questions"][number];
};

const QuestionListItem: FunctionComponent<Props> = ({ question }) =>
{
  const { bookmarks: questionBookmarks, isLoading: isGetQuestionBookmarksLoading } = useBookmarks("forumQuestion", { enabled: true });

  return (
    <div css={styles.questionContentWrapper}>
      <div css={styles.upvoteColumn}>
        <QuestionUpvoteButton
          isUpvoted={false}
          /* isUpvoted={question.isUpvoted}*/
          questionId={question.id}
          upvotesCount={question.upvotesCount}
        />
      </div>
      <div css={styles.contentColumn}>
        <div css={styles.titleWrapper}>
          <div css={styles.titleAndCheckmarkWrapper}>
            <Title order={2} css={styles.title}>{question.title}</Title>
            <div css={styles.checkmark}>
              <Check/>
            </div>
          </div>
          <div css={styles.bookmarkButtonWrapper}>
            <BookmarkButton
              areAllBookmarksLoading={isGetQuestionBookmarksLoading}
              isBookmarked={questionBookmarks.some(bookmark => bookmark?.resourceId === question?.id) || false}
              resourceId={question.id}
              variant="forumQuestion"
            />
          </div>
        </div>
        <div>
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
            <div css={styles.authorAndDateSeparator}/>
            <p css={styles.date}>
              {question.createdAt.toLocaleDateString("de", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
              {(question.createdAt.getTime() !== question.updatedAt.getTime()) && " (bearbeitet)"}
            </p>
          </div>
          <p css={styles.excerpt}>
            {removeHtmlTagsFromString(question.questionText, true)}
          </p>
        </div>
        <div css={styles.bottomWrapper}>
          <div css={styles.tagsWrapper}>
            <Tag title={question.legalArea}/>
            <Tag title={question.legalArea}/>
            <Tag title={question.legalArea}/>
            <Tag title={question.legalField}/>
            <Tag title={question.legalTopic}/>
          </div>
          <div css={styles.answersCountWrapper}>
            <Chat size={20}/>
            <p>12</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionListItem;
