import { Input } from "@/components/atoms/Input/Input";
import { loginFormSchema, type LoginFormSchema } from "@/schemas/auth/loginForm.schema";
import { postQuestionSchema, type PostQuestionSchema } from "@/schemas/forum/postQuestion.schema";

import { Modal, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import React, { type FunctionComponent } from "react";

import * as styles from "./QuestionModal.styles";

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
              {...form.getInputProps("questionText")}
            />
          </form>
        </div>
        <div css={styles.rightSide}>
          <p>Right side</p>
        </div>
      </div>
    </Modal>
  );
};

export default QuestionModal;
