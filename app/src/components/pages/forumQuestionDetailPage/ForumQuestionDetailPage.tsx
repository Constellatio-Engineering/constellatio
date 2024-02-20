/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button, type TButton } from "@/components/atoms/Button/Button";
import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import { Cross } from "@/components/Icons/Cross";
import { ExpandIcon } from "@/components/Icons/Expand";
import LegalFieldsAndTopicsTags from "@/components/molecules/legalFieldsAndTopicsTags/LegalFieldsAndTopicsTags";
import BookmarkButton from "@/components/organisms/caseBlock/BookmarkButton/BookmarkButton";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import EditQuestionModal from "@/components/pages/forumOverviewPage/editQuestionModal/EditQuestionModal";
import ForumListItem from "@/components/pages/forumOverviewPage/forumListItem/ForumListItem";
import AnswerEditor from "@/components/pages/forumQuestionDetailPage/answerEditor/AnswerEditor";
import AnswerListItemWithReplies from "@/components/pages/forumQuestionDetailPage/answerListItemWithReplies/AnswerListItemWithReplies";
import AnswersSkeleton from "@/components/pages/forumQuestionDetailPage/answersSkeleton/AnswersSkeleton";
import EditAndDeleteButtons from "@/components/pages/forumQuestionDetailPage/editAndDeleteButtons/EditAndDeleteButtons";
import ForumItemAuthor from "@/components/pages/forumQuestionDetailPage/forumItemAuthor/ForumItemAuthor";
import ForumQuestionDetailsPageSkeleton from "@/components/pages/forumQuestionDetailPage/forumQuestionDetailsPageSkeleton/ForumQuestionDetailsPageSkeleton";
import useBookmarks from "@/hooks/useBookmarks";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { useForumAnswers } from "@/hooks/useForumAnswers";
import { useForumQuestionDetails } from "@/hooks/useForumQuestionDetails";
import { usePostAnswer } from "@/hooks/usePostAnswer";
import useUserDetails from "@/hooks/useUserDetails";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { type GetAnswersSortingOption } from "@/schemas/forum/getAnswers.schema";
import { useForumPageStore } from "@/stores/forumPage.store";
import { api } from "@/utils/api";
import { appPaths } from "@/utils/paths";

import { Modal, Title, TypographyStylesProvider } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import ErrorPage from "next/error";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, type FunctionComponent, useState } from "react";

import * as styles from "./ForumQuestionDetailPage.styles";
import { QuestionUpvoteButton } from "../forumOverviewPage/upvoteButton/QuestionUpvoteButton";

type SortingOptions = {
  [key in GetAnswersSortingOption]: {
    readonly label: string;
  };
};

const sortingOptions: SortingOptions = {
  newest: {
    label: "Neueste",
  },
  upvotes: {
    label: "Upvotes",
  },
} as const;

type Props = {
  readonly questionId: string;
};

export const ForumQuestionDetailPage: FunctionComponent<Props> = ({ questionId }) =>
{
  const router = useRouter();
  const { invalidateForumAnswers, invalidateForumQuestion, invalidateForumQuestions } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { bookmarks: questionBookmarks, isLoading: isGetQuestionBookmarksLoading } = useBookmarks("forumQuestion", { enabled: true });
  const { userDetails } = useUserDetails();
  const setEditQuestionState = useForumPageStore((state) => state.setEditQuestionState);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const openDeleteModal = (): void => setShowDeleteModal(true);
  const closeDeleteModal = (): void => setShowDeleteModal(false);
  const { isPending: isPostingAnswer, mutateAsync: postAnswer } = usePostAnswer({
    onSuccess: async () => invalidateForumQuestion({ questionId })
  });
  const answersSorting = useForumPageStore(s => s.answersSorting);
  const setAnswersSorting = useForumPageStore(s => s.setAnswersSorting);
  const { data: question, isPending } = useForumQuestionDetails(questionId);
  const { data: answers, isLoading: areAnswersLoading, /* isRefetching: areAnswersRefetching*/ } = useForumAnswers({
    parent: {
      parentType: "question",
      questionId
    },
    sortBy: answersSorting
  });

  const { isPending: isDeletingQuestion, mutate: deleteQuestion } = api.forum.deleteQuestion.useMutation({
    onError: () =>
    {
      notifications.show({
        autoClose: false,
        color: "red",
        message: "Deine Frage konnte nicht gelöscht werden. Bitte versuche es erneut.",
        title: "Da ist leider etwas schiefgelaufen...",
      });
    },
    onSettled: closeDeleteModal,
    onSuccess: async () =>
    {
      await Promise.all([
        invalidateForumQuestions(),
        router.push(appPaths.forum)
      ]);

      notifications.show({
        autoClose: 10000,
        color: "green",
        message: "Deine Frage wurde erfolgreich gelöscht",
        title: "Frage gelöscht",
      });
    }
  });

  const changeSorting = async (newSorting: GetAnswersSortingOption): Promise<void> =>
  {
    setAnswersSorting(newSorting);
    await invalidateForumAnswers({
      parent: {
        parentType: "question",
        questionId
      },
      sortBy: newSorting
    });
  };

  if(isPending)
  {
    return (
      <ForumQuestionDetailsPageSkeleton/>
    );
  }

  if(!question)
  {
    return (
      <ErrorPage statusCode={404}/>
    );
  }

  const amountOfAnswers = answers?.length;
  const hasNoAnswers = amountOfAnswers != null && amountOfAnswers === 0;
  const isCurrentUserAuthor = userDetails?.id === question.author.id;

  return (
    <Fragment>
      <EditQuestionModal {...question}/>
      <Modal
        lockScroll={false}
        withCloseButton={false}
        styles={styles.modalStyles()}
        opened={showDeleteModal}
        closeOnEscape={true}
        size={"lg"}
        closeOnClickOutside={true}
        centered
        onClose={closeDeleteModal}>
        <span className="close-btn" onClick={() => setShowDeleteModal(false)}>
          <Cross size={32}/>
        </span>
        <Title order={3} mb={20}>Frage löschen</Title>
        <BodyText
          styleType="body-01-regular"
          component="p"
          className="delete-question-text"
          mb={20}>
          Bist du sicher, dass du deine Frage &nbsp;&quot;<strong>{question.title}</strong>&quot;&nbsp;löschen mächtest? Das kann nicht rückgängig gemacht werden.
        </BodyText>
        <div className="modal-call-to-action">
          <Button<"button">
            style={{ marginRight: 12 }}
            disabled={isDeletingQuestion}
            styleType={"secondarySimple" as TButton["styleType"]}
            onClick={closeDeleteModal}>
            Nein, behalten
          </Button>
          <Button<"button">
            styleType="primary"
            loading={isDeletingQuestion}
            onClick={() => deleteQuestion({ questionId })}>
            Ja, löschen
          </Button>
        </div>
      </Modal>
      <div css={styles.questionWrapper}>
        <ContentWrapper stylesOverrides={styles.contentWrapper}>
          <Link href={appPaths.forum} css={styles.backToForumLink}>
            <ExpandIcon size={20}/>
            <span>Zurück zur Übersicht</span>
          </Link>
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
                  <LegalFieldsAndTopicsTags
                    displayMode={"multiLine"}
                    areTagsClickable={true}
                    topicsIds={question.topicsIds}
                    legalFieldId={question.legalFieldId}
                    subfieldsIds={question.subfieldsIds}
                  />
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
                  <div css={styles.editAndDeleteButtonsWrapper}>
                    <EditAndDeleteButtons
                      isCurrentUserAuthor={isCurrentUserAuthor}
                      onDelete={openDeleteModal}
                      onEdit={() => setEditQuestionState(questionId)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </ForumListItem>
        </ContentWrapper>
      </div>
      <ContentWrapper stylesOverrides={styles.contentWrapper}>
        <div css={styles.answersWrapper}>
          <div css={styles.head}>
            <div css={styles.totalAmountAndSortingWrapper(amountOfAnswers != null)}>
              {amountOfAnswers != null && (
                <p css={styles.totalAmount}>
                  {amountOfAnswers === 1 ? "1 Antwort" : `${amountOfAnswers} Antworten`}
                </p>
              )}
              <div css={[styles.sortWrapper, (answers == null || answers.length === 0) && styles.sortWrapperHidden]}>
                <p>Sortieren nach:</p>
                <select
                  css={styles.selectSorting}
                  onChange={(event) =>
                  {
                    const value = event.target.value as GetAnswersSortingOption;
                    void changeSorting(value);
                  }}
                  value={answersSorting}>
                  {Object.entries(sortingOptions).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {areAnswersLoading ? (
            <AnswersSkeleton
              numberOfSkeletons={5}
              withReplyButton={true}
            />
          ) : (
            <Fragment>
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
              {(answers?.length ?? 0) > 0 && (
                <div css={styles.separator}/>
              )}
              <AnswerEditor
                mode={{ editorMode: "create" }}
                saveButton={{
                  action: async (editor) =>
                  {
                    await postAnswer({
                      parent: {
                        parentType: "question",
                        questionId
                      },
                      text: editor?.getHTML()
                    });
                  },
                  buttonText: "Antwort posten",
                  clearAfterAction: true,
                  isLoading: isPostingAnswer
                }}
              />
              {hasNoAnswers && (
                <EmptyStateCard
                  title="Es gibt noch keine Antworten"
                  text="Sei der Erste, der diese Frage beantwortet! Nutze dafür einfach das Textfeld oben."
                  variant="For-large-areas"
                />
              )}
            </Fragment>
          )}
        </div>
      </ContentWrapper>
    </Fragment>
  );
};
