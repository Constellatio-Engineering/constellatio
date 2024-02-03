import QuestionModal, { emptyFormValues } from "@/components/pages/forumOverviewPage/questionModal/QuestionModal";
import { usePostQuestion } from "@/hooks/usePostQuestion";
import { postQuestionSchema, type PostQuestionSchema } from "@/schemas/forum/postQuestion.schema";
import { useForumPageStore } from "@/stores/forumPage.store";

import { useForm, zodResolver } from "@mantine/form";
import React, { type FunctionComponent } from "react";

const PostQuestionModal: FunctionComponent = () =>
{
  const modalState = useForumPageStore((state) => state.modalState);
  const isModalOpened = modalState.state === "create";
  const closeAskQuestionModal = useForumPageStore((state) => state.closeAskQuestionModal);

  const form = useForm<PostQuestionSchema>({
    initialValues: emptyFormValues,
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

  return (
    <QuestionModal
      error={postQuestionError}
      form={form}
      isLoading={isLoading}
      onSubmit={(question) => postQuestion(question)}
      opened={isModalOpened}
      keepMounted={true}
      onClose={closeAskQuestionModal}
    />
  );
};

export default PostQuestionModal;
