import Tag from "@/components/atoms/tag/Tag";
import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import { Chat } from "@/components/Icons/Chat";
import { Check } from "@/components/Icons/Check";
import BookmarkButton from "@/components/organisms/caseBlock/BookmarkButton/BookmarkButton";
import MantineRichtextRenderer from "@/components/organisms/mantineRichtextRenderer/MantineRichtextRenderer";
import EditQuestionModal from "@/components/pages/forumOverviewPage/editQuestionModal/EditQuestionModal";
import ForumListItem from "@/components/pages/forumOverviewPage/forumListItem/ForumListItem";
import { RichtextEditorField } from "@/components/pages/forumOverviewPage/questionModal/RichtextEditorField/RichtextEditorField";
import { TagsSkeleton } from "@/components/pages/forumOverviewPage/questionsSkeleton/QuestionsSkeleton";
import QuestionUpvoteButton from "@/components/pages/forumOverviewPage/questionUpvoteButton/QuestionUpvoteButton";
import AnswerListItem from "@/components/pages/forumQuestionDetailPage/answerListItem/AnswerListItem";
import useBookmarks from "@/hooks/useBookmarks";
import { useForumAnswers } from "@/hooks/useForumAnswers";
import { useForumQuestionDetails } from "@/hooks/useForumQuestionDetails";
import { useLegalFieldsAndTopics } from "@/hooks/useLegalFieldsAndTopics";
import type { PostQuestionSchema } from "@/schemas/forum/postQuestion.schema";
import { api } from "@/utils/api";
import { removeHtmlTagsFromString } from "@/utils/utils";

import { Title, TypographyStylesProvider } from "@mantine/core";
import Image from "next/image";
import React, { Fragment, type FunctionComponent } from "react";

import * as styles from "./ForumQuestionDetailPage.styles";
import genericProfileIcon from "../../../../public/images/icons/generic-user-icon.svg";

type Props = {
  readonly questionId: string;
};

export const ForumQuestionDetailPage: FunctionComponent<Props> = ({ questionId }) =>
{
  const apiContext = api.useUtils();
  const { bookmarks: questionBookmarks, isLoading: isGetQuestionBookmarksLoading } = useBookmarks("forumQuestion", { enabled: true });

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

  const { data: answers, isLoading: areAnswersLoading } = useForumAnswers(questionId);

  const { isPending: isPostingAnswer, mutate: postAnswer } = api.forum.postAnswer.useMutation({
    onError: (error) => console.error(error),
    onSuccess: () =>
    {
      console.log("Success");
      void apiContext.forum.getAnswers.invalidate({ questionId });
    },
  });

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
          <ForumListItem stylesOverrides={styles.postAnswerFormWrapper}>
            <RichtextEditorField
              value={""}
              minHeight={100}
              onChange={e => console.log(e)}
              buttons={[
                {
                  action: (editor) =>
                  {
                    postAnswer({
                      parent: {
                        parentType: "question",
                        questionId
                      },
                      text: editor?.getHTML()
                    });
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
          {answers?.map((answer) => (
            <ForumListItem key={answer.id}>
              <AnswerListItem {...answer}/>
            </ForumListItem>
          ))}
        </div>
      </ContentWrapper>
    </Fragment>
  );
};
