import { Input } from "@/components/atoms/Input/Input";
import { postQuestionSchema, type PostQuestionSchema } from "@/schemas/forum/postQuestion.schema";

import { Modal, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import React, { type FunctionComponent } from "react";

import * as styles from "./QuestionModal.styles";
import { RichtextEditorField } from "./RichtextEditorField/RichtextEditorField";

const QuestionModal: FunctionComponent = () =>
{
  const form = useForm<PostQuestionSchema>({
    initialValues: {
      questionText: "",
      title: "",
    },
    validate: zodResolver(postQuestionSchema),
    validateInputOnBlur: true,
  });

  return (
    <Modal
      opened
      withCloseButton={false}
      closeOnEscape
      closeOnClickOutside
      size="80rem"
      styles={{
        body: {
          padding: 0,
        },
      }}
      centered
      onClose={() => console.log("onClose")}>
      <div css={styles.wrapper}>
        <div css={styles.leftSide}>
          <Title order={2} css={styles.title}>
            Stelle deine Frage
          </Title>
          <form>
            <Input
              inputType="text"
              label="Titel deiner Frage"
              description="Kurze und prägnante Beschreibung deiner Frage"
              title="Titel deiner Frage"
              mb={50}
              {...form.getInputProps("questionText")}
            />
          </form>
          <RichtextEditorField content="" onChange={e => console.log(e)}/>
        </div>
        <div css={styles.rightSide}>
          <p>Right side</p>
        </div>
      </div>
    </Modal>
  );
};

export default QuestionModal;
