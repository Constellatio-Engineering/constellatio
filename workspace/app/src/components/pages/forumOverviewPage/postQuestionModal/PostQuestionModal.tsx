import QuestionModal from "@/components/pages/forumOverviewPage/questionModal/QuestionModal";
import { usePostQuestion } from "@/hooks/usePostQuestion";
import { useForumPageStore } from "@/stores/forumPage.store";

import { postQuestionSchema, type PostQuestionSchema } from "@constellatio/schemas/routers/forum/postQuestion.schema";
import { useForm, zodResolver } from "@mantine/form";
import { type FunctionComponent } from "react";

const PostQuestionModal: FunctionComponent = () =>
{
  const modalState = useForumPageStore((state) => state.modalState);
  const isModalOpened = modalState.state === "create";
  const closeAskQuestionModal = useForumPageStore((state) => state.closeAskQuestionModal);

  const form = useForm<PostQuestionSchema>({
    initialValues: {
      legalFieldId: undefined,
      subfieldsIds: [],
      text: "",
      title: "",
      topicsIds: [],
    },
    validate: zodResolver(postQuestionSchema),
    validateInputOnBlur: true,
    validateInputOnChange: ["title"]
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
      variant={"add"}
      error={postQuestionError}
      form={form}
      isLoading={isLoading}
      onSubmit={(question) => postQuestion(question)}
      opened={isModalOpened}
      onClose={closeAskQuestionModal}
    />
  );
};

export default PostQuestionModal;
