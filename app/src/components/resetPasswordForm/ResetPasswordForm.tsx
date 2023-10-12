import { supabase } from "@/lib/supabase";

import { Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import React, { type FunctionComponent } from "react";

import * as styles from "./ResetPasswordForm.styles";
import { BodyText } from "../atoms/BodyText/BodyText";
import { Button } from "../atoms/Button/Button";
import { Input } from "../atoms/Input/Input";

export interface ResetPasswordFormValues 
{
  email: string;
}

const ResetPasswordForm: FunctionComponent = () => 
{

  const form = useForm<ResetPasswordFormValues>();
  const handleSubmit = form.onSubmit(async (formValues) =>
  {
    try
    {
      notifications.show({
        message: "The password reset handler was called",
        title: "Password reset handler",
      });
      await supabase.auth.resetPasswordForEmail(formValues.email, {
        redirectTo: "http://localhost:3000/recover",
      });
    }
    catch (error)
    {
      console.log(error);
    }
  });
  return (
    <div css={styles.wrapper}>
      <Title mb={16} order={3}>Passwort zurücksetzen</Title>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Stack spacing="spacing-24">
          <BodyText component="p" styleType="body-01-regular">
            You will receive an email from us with a link. Clicking this link will take you to a page where you can
            enter your new password.
          </BodyText>
          <Input inputType="text" label="Email" {...form.getInputProps("email")}/>
          <Button<"button"> styleType="primary" type="submit">
            Zurücksetzen
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
