/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button, type TButton } from "@/components/atoms/Button/Button";
import { Check } from "@/components/Icons/Check";
import { Cross } from "@/components/Icons/Cross";
import { ExpandIcon } from "@/components/Icons/Expand";
import AnswerUpvoteButton from "@/components/pages/forumOverviewPage/upvoteButton/AnswerUpvoteButton";
import AnswersSkeleton from "@/components/pages/forumQuestionDetailPage/answersSkeleton/AnswersSkeleton";
import EditAndDeleteButtons from "@/components/pages/forumQuestionDetailPage/editAndDeleteButtons/EditAndDeleteButtons";
import ForumItemAuthor from "@/components/pages/forumQuestionDetailPage/forumItemAuthor/ForumItemAuthor";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { useForumAnswerDetails } from "@/hooks/useForumAnswerDetails";
import useUserDetails from "@/hooks/useUserDetails";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { type GetAnswersAnswerParent, type GetAnswersQuestionParent } from "@/schemas/forum/getAnswers.schema";
import { useForumPageStore } from "@/stores/forumPage.store";
import { api } from "@/utils/api";
import { type Prettify } from "@/utils/types";

import { Loader, Modal, Title, TypographyStylesProvider } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { type FunctionComponent, useState } from "react";

import * as styles from "./AnswerListItem.styles";
import ForumListItem from "../../forumOverviewPage/forumListItem/ForumListItem";
import AnswerEditor from "../answerEditor/AnswerEditor";

interface CommonProps
{
  readonly answerId: string;
}

export interface AnswerProps extends CommonProps
{
  readonly answerType: "answer";
  readonly numberOfReplies: number | undefined;
  readonly onAddReplyClick: () => void;
  readonly parent: GetAnswersQuestionParent;
}

export interface ReplyProps extends CommonProps
{
  readonly answerType: "reply";
  readonly numberOfReplies: undefined;
  readonly parent: GetAnswersAnswerParent;
}

type Props = Prettify<AnswerProps | ReplyProps>;

const AnswerListItem: FunctionComponent<Props> = ({
  answerId,
  numberOfReplies,
  parent,
  ...props
}) =>
{
  const { invalidateForumAnswer, invalidateForumQuestion } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const toggleAnswerReplies = useForumPageStore(s => s.toggleAnswerReplies);
  const areRepliesExpanded = useForumPageStore(s => s.getAreRepliesExpanded(answerId));
  const hasReplies = numberOfReplies != null && numberOfReplies > 0;
  const { userDetails } = useUserDetails();
  const { invalidateForumAnswers } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { data: answer, isLoading } = useForumAnswerDetails({ answerId, parent });
  const authorId = answer?.author.id;
  const isCorrectAnswer = answer?.isCorrectAnswer ?? false;
  const isCurrentUserAuthor = authorId != null && userDetails?.id === authorId;
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const openDeleteModal = (): void => setShowDeleteModal(true);
  const closeDeleteModal = (): void => setShowDeleteModal(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { isPending: isUpdatingAnswer, mutateAsync: updateAnswer } = api.forum.updateAnswer.useMutation({
    onError: () =>
    {
      notifications.show({
        autoClose: false,
        color: "red",
        message: "Deine Antwort konnte nicht bearbeitet werden. Bitte versuche es erneut.",
        title: "Da ist leider etwas schiefgelaufen...",
      });
    },
    onSuccess: () =>
    {
      void invalidateForumAnswer({ answerId });
      setIsEditing(false);
    }
  });
  const { isPending: isDeletingAnswer, mutate: deleteAnswer } = api.forum.deleteAnswer.useMutation({
    onError: () =>
    {
      notifications.show({
        autoClose: false,
        color: "red",
        message: "Deine Antwort konnte nicht gelöscht werden. Bitte versuche es erneut.",
        title: "Da ist leider etwas schiefgelaufen...",
      });
    },
    onSettled: closeDeleteModal,
    onSuccess: async (deletedQuestions) =>
    {
      const parentQuestion = deletedQuestions.find(q => q.parentQuestionId != null);
      const parentAnswer = deletedQuestions.find(a => a.parentAnswerId != null);

      if(parentQuestion)
      {
        // deleted answer was response to a question. invalidate all answers of the parent question
        await invalidateForumAnswers({
          parent: {
            parentType: "question",
            questionId: parentQuestion.parentQuestionId!
          },
          sortBy: "newest"
        });
      }
      else if(parentAnswer)
      {
        // deleted answer was response to an answer. invalidate all replies to the parent answer
        await invalidateForumAnswers({
          parent: {
            answerId: parentAnswer.parentAnswerId!,
            parentType: "answer"
          },
          sortBy: "newest"
        });
      }

      notifications.show({
        autoClose: 10000,
        color: "green",
        message: "Deine Antwort wurde erfolgreich gelöscht",
        title: "Antwort gelöscht",
      });
    }
  });

  const onSuccessfulCorrectMarkingMutation = (): void =>
  {
    void invalidateForumAnswer({ answerId });

    if(parent.parentType === "question")
    {
      void invalidateForumQuestion({ questionId: parent.questionId });
    }
  };

  const { isPending: isMarkingAnswerAsCorrect, mutate: markAnswerAsCorrect } = api.forum.markAnswerAsCorrect.useMutation({
    onError: () =>
    {
      notifications.show({
        autoClose: false,
        color: "red",
        message: "Die Antwort konnte nicht als korrekt markiert werden. Bitte versuche es erneut.",
        title: "Da ist leider etwas schiefgelaufen...",
      });
    },
    onSuccess: onSuccessfulCorrectMarkingMutation
  });
  const { isPending: isUnmarkingAnswerAsCorrect, mutate: unmarkAnswerAsCorrect } = api.forum.unmarkAnswerAsCorrect.useMutation({
    onError: () =>
    {
      notifications.show({
        autoClose: false,
        color: "red",
        message: "Die Markierung der Antwort als korrekt konnte nicht entfernt werden. Bitte versuche es erneut.",
        title: "Da ist leider etwas schiefgelaufen...",
      });
    },
    onSuccess: onSuccessfulCorrectMarkingMutation
  });

  const onMarkAsCorrect = (): void =>
  {
    const wasConfirmed = window.confirm("Möchtest du diese Antwort als korrekt markieren?");

    if(!wasConfirmed)
    {
      return;
    }

    markAnswerAsCorrect({ answerId });
  };

  const onUnmarkAsCorrect = (): void =>
  {
    const wasConfirmed = window.confirm("Möchtest du die Markierung dieser Antwort als korrekt aufheben?");

    if(!wasConfirmed)
    {
      return;
    }

    unmarkAnswerAsCorrect({ answerId });
  };

  if(isLoading)
  {
    return <AnswersSkeleton numberOfSkeletons={1} withReplyButton={true}/>;
  }

  if(answer == null)
  {
    return (
      <ForumListItem>
        <p>Error - Answer not found</p>
      </ForumListItem>
    );
  }

  if(isEditing)
  {
    return (
      <AnswerEditor
        cancelButtonAction={() => setIsEditing(false)}
        saveButton={{
          action: async (editor) =>
          {
            await updateAnswer({
              answerId,
              text: editor?.getHTML()
            });
          },
          buttonText: "Antwort posten",
          clearAfterAction: false,
          isLoading: isUpdatingAnswer
        }}
        mode={{
          editorMode: "edit",
          initialContent: answer.text
        }}
      />
    );
  }
  
  return (
    <>
      <Modal
        lockScroll={false}
        withCloseButton={false}
        styles={styles.modalStyles()}
        opened={showDeleteModal}
        closeOnEscape={true}
        keepMounted={false}
        size={"lg"}
        closeOnClickOutside={true}
        centered
        onClose={closeDeleteModal}>
        <span className="close-btn" onClick={() => setShowDeleteModal(false)}>
          <Cross size={32}/>
        </span>
        <Title order={3} mb={20}>Antwort löschen</Title>
        <BodyText
          styleType="body-01-regular"
          component="p"
          className="delete-answer-text"
          mb={20}>
          Bist du sicher, dass du deine Antwort löschen mächtest? Das kann nicht rückgängig gemacht werden.
        </BodyText>
        <div className="modal-call-to-action">
          <Button<"button">
            style={{ marginRight: 12 }}
            disabled={isDeletingAnswer}
            styleType={"secondarySimple" as TButton["styleType"]}
            onClick={closeDeleteModal}>
            Nein, behalten
          </Button>
          <Button<"button">
            styleType="primary"
            loading={isDeletingAnswer}
            onClick={() => deleteAnswer({ answerId })}>
            Ja, löschen
          </Button>
        </div>
      </Modal>
      <ForumListItem isMarkedAsCorrect={isCorrectAnswer} stylesOverrides={styles.forumListItem}>
        {(props.answerType === "answer" && userDetails?.isForumModerator) && (
          <>
            {isCorrectAnswer ? (
              <button
                type={"button"}
                className={"markAsCorrectButton"}
                title={"Korrekt Markierung entfernen"}
                onClick={onUnmarkAsCorrect}>
                {isUnmarkingAnswerAsCorrect ? <Loader size={24}/> : <Cross size={24}/>}
              </button>
            ) : (
              <button
                type={"button"}
                className={"markAsCorrectButton"}
                title={"Als korrekt markieren"}
                onClick={onMarkAsCorrect}>
                {isMarkingAnswerAsCorrect ? <Loader size={24}/> : <Check size={24}/>}
              </button>
            )}
          </>
        )}
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
            <div css={styles.bottomWrapper}>
              <div>
                {isCurrentUserAuthor && (
                  <EditAndDeleteButtons
                    isCurrentUserAuthor={isCurrentUserAuthor}
                    onDelete={openDeleteModal}
                    onEdit={() => setIsEditing(true)}
                  />
                )}
              </div>
              <div css={styles.replyWrapper}>
                {props.answerType === "answer" && (
                  <>
                    {hasReplies && (
                      <button
                        type={"button"}
                        css={styles.toggleRepliesButton(areRepliesExpanded)}
                        onClick={() => toggleAnswerReplies(answerId)}>
                        <p>{numberOfReplies} Antworten</p>
                        <ExpandIcon size={22}/>
                      </button>
                    )}
                    <Button<"button">
                      styleType={"primary"}
                      size={"medium"}
                      onClick={props.onAddReplyClick}>
                      Antworten
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </ForumListItem>
    </>
  );
};

export default AnswerListItem;
