import { Button } from "@/components/atoms/Button/Button";
import { Dropdown } from "@/components/atoms/Dropdown/Dropdown";
import { Input } from "@/components/atoms/Input/Input";
import { Cross } from "@/components/Icons/Cross";
import ErrorCard, { type ErrorCardsProps } from "@/components/molecules/errorCard/ErrorCard";
import { useDataLossProtection } from "@/hooks/useDataLossProtection";
import { type PostQuestionSchema } from "@/schemas/forum/postQuestion.schema";
import { useForumPageStore } from "@/stores/forumPage.store";

import { Modal, type ModalProps, Title } from "@mantine/core";
import { type UseFormReturnType } from "@mantine/form";
import React, { type FunctionComponent, useEffect, useMemo, useRef } from "react";

import * as styles from "./QuestionModal.styles";
import { RichtextEditorField } from "./RichtextEditorField/RichtextEditorField";

export type QuestionModalProps = Omit<ModalProps, "onSubmit"> & {
  readonly error: ErrorCardsProps["error"];
  readonly form: UseFormReturnType<PostQuestionSchema>;
  readonly isLoading: boolean;
  readonly keepMounted: boolean;
  readonly onSubmit: (formValues: PostQuestionSchema) => void;
};

const QuestionModal: FunctionComponent<QuestionModalProps> = ({
  centered = true,
  closeOnClickOutside = true,
  closeOnEscape = true,
  error,
  form,
  isLoading,
  onSubmit,
  size = "74rem",
  styles: additionalStyles,
  withCloseButton = false,
  ...props
}) =>
{
  const closeAskQuestionModal = useForumPageStore((state) => state.closeAskQuestionModal);
  const formWrapperRef = useRef<HTMLDivElement>(null);
  const richtextValue = useMemo(() => form.values.question, [form.values.question]);

  useDataLossProtection(form.isDirty() && props.opened);

  useEffect(() =>
  {
    if(richtextValue !== "")
    {
      return;
    }

    const richtextEditor = formWrapperRef.current?.getElementsByClassName("tiptap ProseMirror")[0] as HTMLDivElement | undefined;

    if(richtextEditor == null)
    {
      return;
    }

    const currentContent = richtextEditor.innerHTML;

    if(richtextValue === currentContent)
    {
      return;
    }

    richtextEditor.innerHTML = "";
  }, [richtextValue]);

  console.log("QuestionModal form.values.question", form.values.question);

  return (
    <Modal
      withCloseButton={withCloseButton}
      closeOnEscape={closeOnEscape}
      closeOnClickOutside={closeOnClickOutside}
      size={size}
      styles={{
        body: {
          padding: 0,
        },
        ...additionalStyles,
      }}
      centered={centered}
      {...props}>
      <form onSubmit={form.onSubmit((formValues) => onSubmit(formValues))} onReset={() => console.log("form was resetted")}>
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
            <ErrorCard error={form.isDirty() ? null : error} shouldUseFullWidth/>
            <div css={styles.inputsWrapper}>
              <Input
                inputType="text"
                label="Titel deiner Frage"
                description="Kurze und prägnante Beschreibung deiner Frage"
                title="Titel deiner Frage"
                {...form.getInputProps("title")}
              />
              {form.values.question != null && (
                <RichtextEditorField
                  label="Deine Frage"
                  {...form.getInputProps("question")}
                />
              )}
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
