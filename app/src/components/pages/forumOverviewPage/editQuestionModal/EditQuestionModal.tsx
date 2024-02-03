import QuestionModal from "@/components/pages/forumOverviewPage/questionModal/QuestionModal";
import { usePostQuestion } from "@/hooks/usePostQuestion";
import { usePrevious } from "@/hooks/usePrevious";
import { postQuestionSchema, type PostQuestionSchema } from "@/schemas/forum/postQuestion.schema";
import { useForumPageStore } from "@/stores/forumPage.store";
import { api } from "@/utils/api";

import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
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
  const isModalOpened = modalState.state === "edit";
  const questionId = modalState.state === "edit" ? modalState.questionId : undefined;
  const previousQuestionId = usePrevious(questionId);
  const closeAskQuestionModal = useForumPageStore((state) => state.closeAskQuestionModal);
  const getQuestionDataFromCache = apiContext.forum.getQuestionById.getData;
  const form = useForm<PostQuestionSchema>({
    initialValues: emptyFormValues,
    validate: zodResolver(postQuestionSchema),
    validateInputOnBlur: true,
  });
  const setFormValues = form.setValues;

  useEffect(() =>
  {
    if(questionId === previousQuestionId)
    {
      return;
    }

    if(questionId == null)
    {
      console.log("questionId is null, setting form values to empty");
      setFormValues(emptyFormValues);
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
      closeAskQuestionModal();
      console.log("questionData is null, setting form values to empty");
      setFormValues(emptyFormValues);
      return;
    }

    console.log("setting form values to question ", questionData.title);
    setFormValues({
      legalArea: questionData.legalArea,
      legalField: questionData.legalField,
      legalTopic: questionData.legalTopic,
      question: questionData.questionText,
      title: questionData.title,
    });
  }, [closeAskQuestionModal, getQuestionDataFromCache, previousQuestionId, questionId, setFormValues]);

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
      keepMounted={false}
      onClose={closeAskQuestionModal}
    />
  );
};

export default EditQuestionModal;
