import Tag from "@/components/atoms/tag/Tag";
import { Chat } from "@/components/Icons/Chat";
import { Check } from "@/components/Icons/Check";
import BookmarkButton from "@/components/organisms/caseBlock/BookmarkButton/BookmarkButton";
import EditQuestionModal from "@/components/pages/forumOverviewPage/editQuestionModal/EditQuestionModal";
import { TagsSkeleton } from "@/components/pages/forumOverviewPage/questionsSkeleton/QuestionsSkeleton";
import useBookmarks from "@/hooks/useBookmarks";
import { useForumQuestionDetails } from "@/hooks/useForumQuestionDetails";
import { useLegalFieldsAndTopics } from "@/hooks/useLegalFieldsAndTopics";
import { getForumQuestionUrl } from "@/utils/paths";
import { removeHtmlTagsFromString } from "@/utils/utils";

import { Title, Tooltip } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, type FunctionComponent } from "react";

import * as styles from "./QuestionListItem.styles";
import genericProfileIcon from "../../../../../public/images/icons/generic-user-icon.svg";
import { QuestionUpvoteButton } from "../upvoteButton/QuestionUpvoteButton";

type Props = {
  readonly questionId: string;
};

const QuestionListItem: FunctionComponent<Props> = ({ questionId }) =>
{
  const { bookmarks: questionBookmarks, isLoading: isGetQuestionBookmarksLoading } = useBookmarks("forumQuestion", { enabled: true });
  const { data: question, /* isFetching*/ } = useForumQuestionDetails(questionId);

  const {
    allLegalFields,
    allSubfields,
    allTopics,
    isLoading: areLegalFieldsAndTopicsLoading
  } = useLegalFieldsAndTopics();

  if(question == null)
  {
    return <p>Question not found</p>;
  }

  const legalField = allLegalFields.find((field) => field.id === question.legalFieldId);
  const subfield = allSubfields.find((subfield) => subfield.id === question.subfieldId);
  const topic = allTopics.find((topic) => topic.id === question.topicId);

  return (
    <Fragment>
      <EditQuestionModal {...question}/>
      <div css={styles.questionContentWrapper}>
        <div css={styles.upvoteColumn}>
          <QuestionUpvoteButton
            authorId={question.author.id}
            isUpvoted={question.isUpvoted}
            questionId={question.id}
            upvotesCount={question.upvotesCount}
          />
        </div>
        <div css={styles.contentColumn}>
          <div css={styles.titleWrapper}>
            <div css={styles.titleAndCheckmarkWrapper}>
              <Link href={getForumQuestionUrl(question)} css={styles.titleLink}>
                <Title order={2} css={styles.title}>{question.title}</Title>
              </Link>
              {question.hasCorrectAnswer && (
                <Tooltip
                  label={"Mindestens eine Antwort wurde als korrekt markiert."}
                  multiline={true}
                  width={200}
                  position={"top"}
                  withArrow={true}>
                  <div css={styles.checkmark}>
                    <Check/>
                  </div>
                </Tooltip>
              )}
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
              {removeHtmlTagsFromString(question.text, true)}
            </p>
          </div>
          <div css={styles.bottomWrapper}>
            {areLegalFieldsAndTopicsLoading ? (
              <TagsSkeleton/>
            ) : (
              <div css={styles.tagsWrapper}>
                {legalField && <Tag title={legalField.mainCategory}/>}
                {subfield && <Tag title={subfield.legalAreaName}/>}
                {topic && <Tag title={topic.topicName}/>}
              </div>
            )}
            <div css={styles.answersCountWrapper}>
              <Chat size={20}/>
              <p>12</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default QuestionListItem;
