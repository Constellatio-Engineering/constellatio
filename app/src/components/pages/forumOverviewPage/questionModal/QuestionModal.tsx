import { Button } from "@/components/atoms/Button/Button";
import { Dropdown } from "@/components/atoms/Dropdown/Dropdown";
import { Input } from "@/components/atoms/Input/Input";
import { Cross } from "@/components/Icons/Cross";
import { useDataLossProtection } from "@/hooks/useDataLossProtection";
import { postQuestionSchema, type PostQuestionSchema } from "@/schemas/forum/postQuestion.schema";
import { useForumPageStore } from "@/stores/forumPage.store";

import { Modal, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import React, { type FunctionComponent } from "react";

import * as styles from "./QuestionModal.styles";
import { RichtextEditorField } from "./RichtextEditorField/RichtextEditorField";

const QuestionModal: FunctionComponent = () =>
{
  const isAskQuestionModalOpen = useForumPageStore((state) => state.isAskQuestionModalOpen);
  const closeAskQuestionModal = useForumPageStore((state) => state.closeAskQuestionModal);

  const form = useForm<PostQuestionSchema>({
    initialValues: {
      legalArea: "",
      legalField: null,
      legalTopic: null,
      question: {
        html: "",
        text: "",
      },
      title: "",
    },
    validate: zodResolver(postQuestionSchema),
    validateInputOnBlur: true,
  });

  useDataLossProtection(form.isDirty());

  const onSubmit = form.onSubmit((formValues) =>
  {
    console.log("submitting", formValues);
  });

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
      <form onSubmit={onSubmit}>
        <div css={styles.wrapper}>
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
  )
  ;
};

export default QuestionModal;
