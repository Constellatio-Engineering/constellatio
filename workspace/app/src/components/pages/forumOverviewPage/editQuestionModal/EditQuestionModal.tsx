import QuestionModal from "@/components/pages/forumOverviewPage/questionModal/QuestionModal";
import { useUpdateQuestion } from "@/hooks/useUpdateQuestion";
import { useForumPageStore } from "@/stores/forumPage.store";

import { type Question } from "@constellatio/api/routers/forum.router";
import { type PostQuestionSchema } from "@constellatio/schemas/routers/forum/postQuestion.schema";
import { questionUpdateSchema } from "@constellatio/schemas/routers/forum/updateQuestion.schema";
import { useForm, zodResolver } from "@mantine/form";
import React, { type FunctionComponent } from "react";

const getFormValuesFromQuestion = (
  question: Pick<Question, "text" | "legalFieldId" | "subfieldsIds" | "topicsIds" | "title">
): PostQuestionSchema => ({
  legalFieldId: question.legalFieldId,
  subfieldsIds: question.subfieldsIds,
  text: question.text,
  title: question.title,
  topicsIds: question.topicsIds,
});

const EditQuestionModal: FunctionComponent<Question> = (originalQuestion) =>
{
  const modalState = useForumPageStore((state) => state.modalState);
  const closeAskQuestionModal = useForumPageStore((state) => state.closeAskQuestionModal);
  const form = useForm<PostQuestionSchema>({
    initialValues: getFormValuesFromQuestion(originalQuestion),
    validate: zodResolver(questionUpdateSchema),
    validateInputOnBlur: true,
    validateInputOnChange: ["title"]
  });
  const isModalOpened = modalState.state === "edit" && modalState.questionId === originalQuestion.id;

  const { error: postQuestionError, isPending: isLoading, mutate: updateQuestion } = useUpdateQuestion({
    onSettled: () => form.resetDirty(),
    onSuccess: (updatedQuestion) =>
    {
      if(updatedQuestion)
      {
        form.setValues(getFormValuesFromQuestion(updatedQuestion));
      }
      closeAskQuestionModal();
    },
  });

  return (
    <QuestionModal
      variant={"edit"}
      error={postQuestionError}
      form={form}
      isLoading={isLoading}
      onSubmit={(questionUpdate) => updateQuestion({
        id: originalQuestion.id,
        updatedValues: questionUpdate,
      })}
      opened={isModalOpened}
      onClose={closeAskQuestionModal}
    />
  );
};

export default EditQuestionModal;
