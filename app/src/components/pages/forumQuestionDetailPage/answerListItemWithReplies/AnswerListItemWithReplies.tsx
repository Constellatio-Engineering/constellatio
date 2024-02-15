/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button, type TButton } from "@/components/atoms/Button/Button";
import { Cross } from "@/components/Icons/Cross";
import { ExpandIcon } from "@/components/Icons/Expand";
import { RichtextEditorField } from "@/components/pages/forumOverviewPage/questionModal/RichtextEditorField/RichtextEditorField";
import AnswerListItem from "@/components/pages/forumQuestionDetailPage/answerListItem/AnswerListItem";
import EditAndDeleteButtons from "@/components/pages/forumQuestionDetailPage/editAndDeleteButtons/EditAndDeleteButtons";
import ForumItemAuthor from "@/components/pages/forumQuestionDetailPage/forumItemAuthor/ForumItemAuthor";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { useForumAnswerDetails } from "@/hooks/useForumAnswerDetails";
import { useForumAnswers } from "@/hooks/useForumAnswers";
import { usePostAnswer } from "@/hooks/usePostAnswer";
import useUserDetails from "@/hooks/useUserDetails";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import type { GetAnswersSchema } from "@/schemas/forum/getAnswers.schema";
import { useForumPageStore } from "@/stores/forumPage.store";
import { api } from "@/utils/api";
import { appPaths } from "@/utils/paths";

import { Modal, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { Fragment, type FunctionComponent, useId, useState } from "react";
import { flushSync } from "react-dom";

import * as styles from "./AnswerListItemWithReplies.styles";

type Props = {
  readonly answerId: string;
  readonly authorId: string;
  readonly parent: GetAnswersSchema["parent"];
};

const AnswerListItemWithReplies: FunctionComponent<Props> = ({ answerId, authorId, parent }) =>
{
  const { invalidateForumAnswers } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const toggleAnswerReplies = useForumPageStore(s => s.toggleAnswerReplies);
  const setRepliesState = useForumPageStore(s => s.setRepliesState);
  const repliesState = useForumPageStore(s => s.getRepliesState(answerId));
  const areRepliesExpanded = useForumPageStore(s => s.getAreRepliesExpanded(answerId));
  const addReplyInputId = useId();
  const { userDetails } = useUserDetails();
  const { isPending: isPostingAnswer, mutateAsync: postAnswer } = usePostAnswer();
  const { data: replies, isLoading: areAnswersLoading } = useForumAnswers({
    parent: {
      answerId,
      parentType: "answer"
    },
    sortBy: "newest"
  });
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const openDeleteModal = (): void => setShowDeleteModal(true);
  const closeDeleteModal = (): void => setShowDeleteModal(false);
  const hasReplies = replies?.length != null && replies.length > 0;

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
    onSuccess: async (deletedQuestions, variables, context) =>
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
        autoClose: false,
        color: "green",
        message: "Deine Antwort wurde erfolgreich gelöscht",
        title: "Antwort gelöscht",
      });
    }
  });

  const onAddReplyClick = (): void =>
  {
    flushSync(() =>
    {
      // flushSync is used to ensure that the input is rendered before it is scrolled to
      setRepliesState(answerId, "view");
    });

    const inputWrapper = document.getElementById(addReplyInputId);

    if(!inputWrapper)
    {
      console.error("InputWrapper not found");
      return;
    }

    inputWrapper.scrollIntoView({ behavior: "smooth" });

    const input = Array.from(inputWrapper.getElementsByClassName("tiptap ProseMirror"))[0] as HTMLDivElement | undefined;

    if(input == null)
    {
      // The input will likely not be rendered yet if the replies were not expanded before
      return;
    }

    input?.focus();
  };

  const isCurrentUserAuthor = userDetails?.id === authorId;

  return (
    <>
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
      <div>
        <AnswerListItem
          isMarkedAsCorrect={false}
          answerId={answerId}
          parent={parent}>
          <div css={styles.bottomWrapper}>
            <div>
              <EditAndDeleteButtons
                isCurrentUserAuthor={isCurrentUserAuthor}
                onDelete={openDeleteModal}
                onEdit={() => console.log("edit")}
              />
            </div>
            <div css={styles.replyWrapper}>
              {hasReplies && (
                <button
                  type={"button"}
                  css={styles.toggleRepliesButton(areRepliesExpanded)}
                  onClick={() => toggleAnswerReplies(answerId)}>
                  <p>{replies.length} Antworten</p>
                  <ExpandIcon size={22}/>
                </button>
              )}
              <Button<"button">
                styleType={"primary"}
                size={"medium"}
                onClick={onAddReplyClick}>
                Antworten
              </Button>
            </div>
          </div>
        </AnswerListItem>
        <div css={styles.repliesWrapper}>
          {areRepliesExpanded && (
            <Fragment>
              {replies?.map((reply) => (
                <AnswerListItem
                  key={reply.id}
                  answerId={reply.id}
                  parent={{
                    answerId,
                    parentType: "answer"
                  }}>
                  <EditAndDeleteButtons
                    isCurrentUserAuthor={isCurrentUserAuthor}
                    onDelete={openDeleteModal}
                    onEdit={() => console.log("edit")}
                  />
                </AnswerListItem>
              ))}
              <RichtextEditorField
                id={addReplyInputId}
                value={""}
                placeholder={"Antwort verfassen..."}
                minHeight={100}
                toolbarLeftContent={userDetails && (
                  <ForumItemAuthor
                    username={userDetails.displayName}
                    userId={userDetails.id}
                    profilePicture={null}
                  />
                )}
                buttons={[
                  replies?.length === 0 ? {
                    action: () => setRepliesState(answerId, "closed"),
                    overwriteDisabled: false,
                    props: {
                      disabled: false,
                      size: "large",
                      styleType: "secondarySimple"
                    },
                    text: "Abbrechen"
                  } : null,
                  {
                    action: async (editor) =>
                    {
                      try
                      {
                        await postAnswer({
                          parent: {
                            answerId,
                            parentType: "answer"
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
            </Fragment>
          )}
        </div>
      </div>
    </>
  );
};

export default AnswerListItemWithReplies;
