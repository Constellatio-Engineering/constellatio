import { Button } from "@/components/atoms/Button/Button";
import { Dropdown } from "@/components/atoms/Dropdown/Dropdown";
import { Input } from "@/components/atoms/Input/Input";
import { Cross } from "@/components/Icons/Cross";
import ErrorCard from "@/components/molecules/errorCard/ErrorCard";
import { useDataLossProtection } from "@/hooks/useDataLossProtection";
import { usePostQuestion } from "@/hooks/usePostQuestion";
import { postQuestionSchema, type PostQuestionSchema } from "@/schemas/forum/postQuestion.schema";
import { useForumPageStore } from "@/stores/forumPage.store";

import { Modal, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import React, { type FunctionComponent, useRef } from "react";

import * as styles from "./QuestionModal.styles";
import { RichtextEditorField } from "./RichtextEditorField/RichtextEditorField";

const QuestionModal: FunctionComponent = () =>
{
  const isAskQuestionModalOpen = useForumPageStore((state) => state.isAskQuestionModalOpen);
  const closeAskQuestionModal = useForumPageStore((state) => state.closeAskQuestionModal);
  const formWrapperRef = useRef<HTMLDivElement>(null);

  const initialFormValues: PostQuestionSchema = {
    legalArea: "",
    legalField: null,
    legalTopic: null,
    question: {
      html: "",
      text: "",
    },
    title: "",
  };

  const form = useForm<PostQuestionSchema>({
    initialValues: initialFormValues,
    validate: zodResolver(postQuestionSchema),
    validateInputOnBlur: true,
  });

  useDataLossProtection(form.isDirty());

  const resetForm = (): void =>
  {
    console.log("resetForm");

    form.reset();

    const richtextEditor = formWrapperRef.current?.getElementsByClassName("tiptap ProseMirror")[0] as HTMLDivElement | undefined;

    if(richtextEditor)
    {
      richtextEditor.innerHTML = initialFormValues.question.html;
    }
  };

  const { error: postQuestionError, isLoading, mutate: postQuestion } = usePostQuestion({
    onSettled: () => form.resetDirty(),
    onSuccess: () =>
    {
      closeAskQuestionModal();
      resetForm();
    },
  });

  console.log("errors", form.errors, form.getInputProps("question").error);

  return (
    <Modal
      opened={isAskQuestionModalOpen}
      withCloseButton={false}
      closeOnEscape
      closeOnClickOutside
      keepMounted
      size="74rem"
      styles={{
        body: {
          padding: 0,
        },
      }}
      centered
      onClose={closeAskQuestionModal}>
      <form onSubmit={form.onSubmit((formValues) => postQuestion(formValues))}>
        <div css={styles.wrapper} ref={formWrapperRef}>
          <button
            type="button"
            css={styles.closeButton}
            onClick={closeAskQuestionModal}>
            <Cross size={32}/>
          </button>
          <div css={styles.leftSide}>
            <Title order={2} css={[styles.title, styles.titleLeftSide]}>
              Stelle deine Frage
            </Title>
            <ErrorCard error={form.isDirty() ? null : postQuestionError} shouldUseFullWidth/>
            <div css={styles.inputsWrapper}>
              <Input
                inputType="text"
                label="Titel deiner Frage"
                description="Kurze und prägnante Beschreibung deiner Frage"
                title="Titel deiner Frage"
                {...form.getInputProps("title")}
              />
              <RichtextEditorField
                label="Deine Frage"
                {...form.getInputProps("question")}
              />
            </div>
            <Button<"button">
              styleType="primary"
              type="submit"
              loading={isLoading}
              disabled={!form.isDirty()}
              css={styles.submitButton}>
              Frage veröffentlichen
            </Button>
          </div>
          <div css={styles.rightSide}>
            <h3 css={[styles.title, styles.titleRightSide]}>
              Kategorien auswählen
            </h3>
            <div css={styles.inputsWrapper}>
              <Dropdown
                label="Add legal field *"
                title="Legal field"
                placeholder="Option auswählen"
                data={[{ label: "Option 1", value: "option-1" }]}
                {...form.getInputProps("legalArea")}
              />
              <Dropdown
                label="Add legal area (optional)"
                title="Legal area"
                placeholder="Option auswählen"
                data={[{ label: "Option 1", value: "option-1" }]}
                {...form.getInputProps("legalField")}
              />
              <Dropdown
                label="Thema hinzufügen (optional)"
                title="Thema"
                placeholder="Option auswählen"
                data={[{ label: "Option 1", value: "option-1" }]}
                {...form.getInputProps("legalTopic")}
              />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default QuestionModal;
