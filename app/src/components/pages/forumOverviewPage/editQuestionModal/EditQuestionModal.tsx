import QuestionModal, { emptyFormValues } from "@/components/pages/forumOverviewPage/questionModal/QuestionModal";
import { usePostQuestion } from "@/hooks/usePostQuestion";
import { usePrevious } from "@/hooks/usePrevious";
import { postQuestionSchema, type PostQuestionSchema } from "@/schemas/forum/postQuestion.schema";
import { Question } from "@/server/api/routers/forum.router";
import { useForumPageStore } from "@/stores/forumPage.store";
import { api } from "@/utils/api";

import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import React, { type FunctionComponent, PropsWithChildren, useEffect, useMemo } from "react";

const DataWrapper: FunctionComponent<PropsWithChildren> = () =>
{
  const closeAskQuestionModal = useForumPageStore((state) => state.closeAskQuestionModal);
  const modalState = useForumPageStore((state) => state.modalState);
  const apiContext = api.useUtils();
  const questionId = modalState.state === "edit" ? modalState.questionId : undefined;
  const getQuestionDataFromCache = apiContext.forum.getQuestionById.getData;

  const questionData: PostQuestionSchema = useMemo(() =>
  {
    if(questionId == null)
    {
      return emptyFormValues;
    }

    const questionData = getQuestionDataFromCache({ questionId });

    if(!questionData)
    {
      notifications.show({
        color: "red",
        message: "Die Frage konnte nicht gefunden werden",
        title: "Da ist leider etwas schiefgelaufen",
      });
      closeAskQuestionModal();
      return emptyFormValues;
    }

    return ({
      legalArea: questionData.legalArea,
      legalField: questionData.legalField,
      legalTopic: questionData.legalTopic,
      question: questionData.questionText,
      title: questionData.title,
    });
  }, [closeAskQuestionModal, getQuestionDataFromCache, questionId]);

  return ();
};

const EditQuestionModal: FunctionComponent<Question> = () =>
{
  const modalState = useForumPageStore((state) => state.modalState);
  const isModalOpened = modalState.state === "edit";
  const closeAskQuestionModal = useForumPageStore((state) => state.closeAskQuestionModal);

  const form = useForm<PostQuestionSchema>({
    validate: zodResolver(postQuestionSchema),
    validateInputOnBlur: true,
  });

  const { error: postQuestionError, isPending: isLoading, mutate: postQuestion } = usePostQuestion({
    onSettled: () => form.resetDirty(),
    onSuccess: () =>
    {
      closeAskQuestionModal();
      form.reset();
    },
  });

  const test = (data: unknown): void => console.log("submit", data);

  return (
    <QuestionModal
      error={postQuestionError}
      form={form}
      isLoading={isLoading}
      onSubmit={(question) => test(question)}
      opened={isModalOpened}
      keepMounted={true}
      onClose={closeAskQuestionModal}
    />
  );
};

export default EditQuestionModal;
