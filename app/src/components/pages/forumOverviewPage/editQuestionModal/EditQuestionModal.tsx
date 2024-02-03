import QuestionModal from "@/components/pages/forumOverviewPage/questionModal/QuestionModal";
import { usePostQuestion } from "@/hooks/usePostQuestion";
import { usePrevious } from "@/hooks/usePrevious";
import { postQuestionSchema, type PostQuestionSchema } from "@/schemas/forum/postQuestion.schema";
import { useForumPageStore } from "@/stores/forumPage.store";
import { api } from "@/utils/api";

import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { isEmptyObject } from "@tiptap/core";
import React, { type FunctionComponent, useEffect } from "react";

export const emptyFormValues: PostQuestionSchema = {
  legalArea: "",
  legalField: null,
  legalTopic: null,
  question: null,
  title: "",
};

const EditQuestionModal: FunctionComponent = () =>
{
  const apiContext = api.useUtils();
  const modalState = useForumPageStore((state) => state.modalState);
  const questionId = modalState.state === "edit" ? modalState.questionId : undefined;
  const previousQuestionId = usePrevious(questionId);
  const closeAskQuestionModal = useForumPageStore((state) => state.closeAskQuestionModal);
  const getQuestionDataFromCache = apiContext.forum.getQuestionById.getData;
  const form = useForm<PostQuestionSchema>({
    initialValues: undefined,
    validate: zodResolver(postQuestionSchema),
    validateInputOnBlur: true,
  });
  const setFormValues = form.setValues;
  const resetForm = form.reset;
  const haveFormValuesBeenSet = !isEmptyObject(form.values);
  const isModalOpened = modalState.state === "edit" && haveFormValuesBeenSet;

  useEffect(() =>
  {
    const _closeModal = useForumPageStore.getState().closeAskQuestionModal;

    if(questionId === previousQuestionId)
    {
      return;
    }

    if(questionId == null)
    {
      resetForm();
      return;
    }

    const questionData = getQuestionDataFromCache({ questionId });

    if(!questionData)
    {
      notifications.show({
        color: "red",
        message: "Die Frage konnte nicht gefunden werden",
        title: "Da ist leider etwas schiefgelaufen",
      });
      _closeModal();
      resetForm();
      return;
    }

    setFormValues({
      legalArea: questionData.legalArea,
      legalField: questionData.legalField,
      legalTopic: questionData.legalTopic,
      question: questionData.questionText,
      title: questionData.title,
    });
  }, [getQuestionDataFromCache, previousQuestionId, questionId, resetForm, setFormValues]);

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
      onClose={closeAskQuestionModal}
    />
  );
};

export default EditQuestionModal;
