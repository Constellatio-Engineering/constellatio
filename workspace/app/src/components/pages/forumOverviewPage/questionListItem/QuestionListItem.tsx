import { Chat } from "@/components/Icons/Chat";
import { Check } from "@/components/Icons/Check";
import LegalFieldsAndTopicsTags from "@/components/molecules/legalFieldsAndTopicsTags/LegalFieldsAndTopicsTags";
import UserProfilePicture from "@/components/molecules/userProfilePicture/UserProfilePicture";
import BookmarkButton from "@/components/organisms/caseBlock/BookmarkButton/BookmarkButton";
import EditQuestionModal from "@/components/pages/forumOverviewPage/editQuestionModal/EditQuestionModal";
import useBookmarks from "@/hooks/useBookmarks";
import { useForumQuestionDetails } from "@/hooks/useForumQuestionDetails";

import { getForumQuestionUrl } from "@constellatio/shared/paths";
import { removeHtmlTagsFromString } from "@constellatio/utils/html";
import { Title, Tooltip } from "@mantine/core";
import Link from "next/link";
import { type FunctionComponent } from "react";

import * as styles from "./QuestionListItem.styles";
import { QuestionUpvoteButton } from "../upvoteButton/QuestionUpvoteButton";

type Props = {
  readonly questionId: string;
};

const QuestionListItem: FunctionComponent<Props> = ({ questionId }) =>
{
  const { bookmarks: questionBookmarks, isLoading: isGetQuestionBookmarksLoading } = useBookmarks("forumQuestion", { enabled: true });
  const { data: question, /* isFetching*/ } = useForumQuestionDetails(questionId);

  if(question == null)
  {
    return <p>Question not found</p>;
  }

  return (
    <Link href={getForumQuestionUrl(question)} style={{ color: "inherit" }} title={question.title}>
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
              <Title order={2} css={styles.title}>{question.title}</Title>
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
                <UserProfilePicture authorProfilePictureUrl={question.authorProfilePictureUrl}/>
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
            <LegalFieldsAndTopicsTags
              displayMode={"multiLine"}
              shouldRenderTagsAsLinks={false}
              topicsIds={question.topicsIds}
              legalFieldId={question.legalFieldId}
              subfieldsIds={question.subfieldsIds}
            />
            <div css={styles.answersCountWrapper}>
              <Chat size={20}/>
              <p>{question.answersCount}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default QuestionListItem;
