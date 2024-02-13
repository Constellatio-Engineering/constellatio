/* eslint-disable max-lines */
import Tag from "@/components/atoms/tag/Tag";
import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import BookmarkButton from "@/components/organisms/caseBlock/BookmarkButton/BookmarkButton";
import EditQuestionModal from "@/components/pages/forumOverviewPage/editQuestionModal/EditQuestionModal";
import ForumListItem from "@/components/pages/forumOverviewPage/forumListItem/ForumListItem";
import { RichtextEditorField } from "@/components/pages/forumOverviewPage/questionModal/RichtextEditorField/RichtextEditorField";
import { TagsSkeleton } from "@/components/pages/forumOverviewPage/questionsSkeleton/QuestionsSkeleton";
import AnswerListItemWithReplies from "@/components/pages/forumQuestionDetailPage/answerListItemWithReplies/AnswerListItemWithReplies";
import ForumItemAuthor from "@/components/pages/forumQuestionDetailPage/forumItemAuthor/ForumItemAuthor";
import useBookmarks from "@/hooks/useBookmarks";
import { useForumAnswers } from "@/hooks/useForumAnswers";
import { useForumQuestionDetails } from "@/hooks/useForumQuestionDetails";
import { useLegalFieldsAndTopics } from "@/hooks/useLegalFieldsAndTopics";
import { usePostAnswer } from "@/hooks/usePostAnswer";
import useUserDetails from "@/hooks/useUserDetails";
import { api } from "@/utils/api";

import { Title, TypographyStylesProvider } from "@mantine/core";
import Image from "next/image";
import React, { Fragment, type FunctionComponent } from "react";

import * as styles from "./ForumQuestionDetailPage.styles";
import genericProfileIcon from "../../../../public/images/icons/generic-user-icon.svg";
import { QuestionUpvoteButton } from "../forumOverviewPage/upvoteButton/QuestionUpvoteButton";

type Props = {
  readonly questionId: string;
};

export const ForumQuestionDetailPage: FunctionComponent<Props> = ({ questionId }) =>
{
  const apiContext = api.useUtils();
  const { bookmarks: questionBookmarks, isLoading: isGetQuestionBookmarksLoading } = useBookmarks("forumQuestion", { enabled: true });
  const { userDetails } = useUserDetails();

  const {
    allLegalFields,
    allSubfields,
    allTopics,
    isLoading: areLegalFieldsAndTopicsLoading
  } = useLegalFieldsAndTopics();

  const {
    data: question,
    isFetching,
    isLoading,
    isPending
  } = useForumQuestionDetails(questionId);

  const { data: answers, isLoading: areAnswersLoading } = useForumAnswers({
    parent: {
      parentType: "question",
      questionId
    },
    sortBy: "newest"
  });

  const { isPending: isPostingAnswer, mutateAsync: postAnswer } = usePostAnswer();

  console.log("---------");
  console.log("questionId", questionId);
  console.log("isFetching", isFetching);
  console.log("isLoading", isLoading);
  console.log("isPending", isPending);

  if(isPending)
  {
    return <p>Loading...</p>;
  }

  if(!question)
  {
    return <p>Question not found</p>;
  }

  const legalField = allLegalFields.find((field) => field.id === question.legalFieldId);
  const subfield = allSubfields.find((subfield) => subfield.id === question.subfieldId);
  const topic = allTopics.find((topic) => topic.id === question.topicId);

  return (
    <Fragment>
      <EditQuestionModal {...question}/>
      <div css={styles.questionWrapper}>
        <ContentWrapper stylesOverrides={styles.contentWrapper}>
          <ForumListItem stylesOverrides={styles.forumListItem}>
            <div css={styles.yellowTopBar}/>
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
                  <Title order={2} css={styles.title}>{question.title}</Title>
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
                  {areLegalFieldsAndTopicsLoading ? (
                    <TagsSkeleton/>
                  ) : (
                    <div css={styles.tagsWrapper}>
                      {legalField && <Tag title={legalField.mainCategory}/>}
                      {subfield && <Tag title={subfield.legalAreaName}/>}
                      {topic && <Tag title={topic.topicName}/>}
                    </div>
                  )}
                  <div css={styles.authorAndDateWrapper}>
                    <ForumItemAuthor
                      username={question.author.username}
                      userId={question.author.id}
                      profilePicture={undefined}
                    />
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
                  <TypographyStylesProvider>
                    <div css={styles.contentWrapper} dangerouslySetInnerHTML={{ __html: question.text }}/>
                  </TypographyStylesProvider>
                </div>
              </div>
            </div>
          </ForumListItem>
        </ContentWrapper>
      </div>
      <ContentWrapper stylesOverrides={styles.contentWrapper}>
        <div css={styles.answersWrapper}>
          <p>Sortieren nach</p>
          {answers?.map((answer) => (
            <AnswerListItemWithReplies
              key={answer.id}
              answerId={answer.id}
              parent={{
                parentType: "question",
                questionId,
              }}
            />
          ))}
          <div css={styles.test}/>
          <ForumListItem contentWrapperStylesOverrides={styles.postAnswerFormWrapper}>
            <RichtextEditorField
              value={""}
              toolbarLeftContent={userDetails && (
                <ForumItemAuthor
                  username={userDetails.displayName}
                  userId={userDetails.id}
                  profilePicture={null}
                />
              )}
              minHeight={100}
              placeholder={"Antwort verfassen..."}
              onChange={e => console.log(e)}
              buttons={[
                {
                  action: async (editor) =>
                  {
                    try
                    {
                      await postAnswer({
                        parent: {
                          parentType: "question",
                          questionId
                        },
                        text: editor?.getHTML()
                      });
                    }
                    catch (e: unknown)
                    {
                      return;
                    }

                    editor.commands.clearContent();
                  },
                  props: {
                    disabled: false,
                    size: "large",
                    styleType: "primary"
                  },
                  text: "Antwort posten"
                },
              ]}
            />
          </ForumListItem>
        </div>
      </ContentWrapper>
    </Fragment>
  );
};
