import { Button } from "@/components/atoms/Button/Button";
import { Dropdown } from "@/components/atoms/Dropdown/Dropdown";
import { Input } from "@/components/atoms/Input/Input";
import { Cross } from "@/components/Icons/Cross";
import ErrorCard, { type ErrorCardsProps } from "@/components/molecules/errorCard/ErrorCard";
import { useDataLossProtection } from "@/hooks/useDataLossProtection";
import { useLegalFieldsAndTopics } from "@/hooks/useLegalFieldsAndTopics";
import { type PostQuestionSchema } from "@/schemas/forum/postQuestion.schema";
import { useForumPageStore } from "@/stores/forumPage.store";

import { Modal, type ModalProps, type SelectItem, Title } from "@mantine/core";
import { type UseFormReturnType } from "@mantine/form";
import React, { type FunctionComponent, useMemo } from "react";

import * as styles from "./QuestionModal.styles";
import { RichtextEditorField } from "./RichtextEditorField/RichtextEditorField";

export type QuestionModalProps = Omit<ModalProps, "onSubmit"> & {
  readonly error: ErrorCardsProps["error"];
  readonly form: UseFormReturnType<PostQuestionSchema>;
  readonly isLoading: boolean;
  readonly onSubmit: (formValues: PostQuestionSchema) => void;
};

const QuestionModal: FunctionComponent<QuestionModalProps> = ({
  centered = true,
  closeOnClickOutside = true,
  closeOnEscape = true,
  error,
  form,
  isLoading,
  keepMounted = false,
  onSubmit,
  size = "74rem",
  styles: additionalStyles,
  withCloseButton = false,
  ...props
}) =>
{
  const closeAskQuestionModal = useForumPageStore((state) => state.closeAskQuestionModal);
  useDataLossProtection(form.isDirty() && props.opened);
  const {
    allLegalFields,
    allSubfields,
    allTopics,
    isLoading: areLegalFieldsAndTopicsLoading
  } = useLegalFieldsAndTopics();
  const legalFieldsOptions: SelectItem[] = useMemo(() => allLegalFields
    .map((field) =>
    {
      if(field.id == null || field.mainCategory == null)
      {
        return null;
      }
      return { label: field.mainCategory, value: field.id };
    })
    .filter(Boolean),
  [allLegalFields]
  );
  const allSubfieldsOptions: SelectItem[] = useMemo(() => allSubfields
    .map((legalArea) =>
    {
      if(legalArea.id == null || legalArea.legalAreaName == null)
      {
        return null;
      }
      return { label: legalArea.legalAreaName, value: legalArea.id };
    })
    .filter(Boolean),
  [allSubfields]
  );
  const topicOptions: SelectItem[] = useMemo(() => allTopics
    .map((topic) =>
    {
      if(topic.id == null || topic.topicName == null)
      {
        return null;
      }
      return { label: topic.topicName, value: topic.id };
    })
    .filter(Boolean),
  [allTopics]
  );

  return (
    <Modal
      onAnimationEnd={(e) => console.log("animation end", e)}
      withCloseButton={withCloseButton}
      closeOnEscape={closeOnEscape}
      closeOnClickOutside={closeOnClickOutside}
      keepMounted={keepMounted}
      size={size}
      styles={{
        body: {
          padding: 0,
        },
        ...additionalStyles,
      }}
      centered={centered}
      {...props}>
      <form onSubmit={form.onSubmit((formValues) => onSubmit(formValues))}>
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
            <ErrorCard error={form.isDirty() ? null : error} shouldUseFullWidth/>
            <div css={styles.inputsWrapper}>
              <Input
                inputType="text"
                label="Titel deiner Frage"
                description="Kurze und prägnante Beschreibung deiner Frage"
                title="Titel deiner Frage"
                {...form.getInputProps("title" satisfies keyof PostQuestionSchema)}
              />
              <RichtextEditorField
                label="Deine Frage"
                {...form.getInputProps("text" satisfies keyof PostQuestionSchema)}
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
                isLoading={areLegalFieldsAndTopicsLoading as boolean}
                label="Rechtsgbiet *"
                title="Rechtsgbiet"
                placeholder="Rechtsgbiet auswählen"
                data={legalFieldsOptions}
                {...form.getInputProps("legalFieldId" satisfies keyof PostQuestionSchema)}
              />
              <Dropdown
                isLoading={areLegalFieldsAndTopicsLoading as boolean}
                label="Teilgebiet (optional)"
                title="Teilgebiet"
                placeholder="Teilgebiet auswählen"
                clearable
                allowDeselect
                data={allSubfieldsOptions}
                {...form.getInputProps("subfieldId" satisfies keyof PostQuestionSchema)}
              />
              <Dropdown
                isLoading={areLegalFieldsAndTopicsLoading as boolean}
                label="Thema (optional)"
                title="Thema"
                placeholder="Thema auswählen"
                clearable
                allowDeselect
                data={topicOptions}
                {...form.getInputProps("topicId" satisfies keyof PostQuestionSchema)}
              />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default QuestionModal;
