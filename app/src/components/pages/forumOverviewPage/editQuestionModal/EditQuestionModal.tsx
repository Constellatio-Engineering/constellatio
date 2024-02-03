import QuestionModal from "@/components/pages/forumOverviewPage/questionModal/QuestionModal";
import { usePostQuestion } from "@/hooks/usePostQuestion";
import { postQuestionSchema, type PostQuestionSchema } from "@/schemas/forum/postQuestion.schema";
import type { Question } from "@/server/api/routers/forum.router";
import { useForumPageStore } from "@/stores/forumPage.store";

import { useForm, zodResolver } from "@mantine/form";
import React, { type FunctionComponent } from "react";

const EditQuestionModal: FunctionComponent<Question> = (originalQuestion) =>
{
  const modalState = useForumPageStore((state) => state.modalState);
  const closeAskQuestionModal = useForumPageStore((state) => state.closeAskQuestionModal);
  const form = useForm<PostQuestionSchema>({
    initialValues: {
      legalArea: originalQuestion.legalArea,
      legalField: originalQuestion.legalField,
      legalTopic: originalQuestion.legalTopic,
      question: originalQuestion.questionText,
      title: originalQuestion.title,
    },
    validate: zodResolver(postQuestionSchema),
    validateInputOnBlur: true,
  });
  const isModalOpened = modalState.state === "edit" && modalState.questionId === originalQuestion.id;

  const closeModal = (): void =>
  {
    form.reset();
    closeAskQuestionModal();
  };

  const { error: postQuestionError, isPending: isLoading, mutate: postQuestion } = usePostQuestion({
    onSettled: () => form.resetDirty(),
    onSuccess: () =>
    {
      closeModal();
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
      onClose={closeModal}
    />
  );
};

export default EditQuestionModal;
