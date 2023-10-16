import { AlertCard } from "@/components/atoms/Card/AlertCard";
import { type ResetPasswordModalProgress } from "@/components/organisms/ResetPasswordModal/ResetPasswordModal";
import { env } from "@/env.mjs";
import { supabase } from "@/lib/supabase";
import { paths } from "@/utils/paths";

import { Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { type Dispatch, type FunctionComponent, type SetStateAction, useState } from "react";

import * as styles from "./ResetPasswordForm.styles";
import { BodyText } from "../atoms/BodyText/BodyText";
import { Button } from "../atoms/Button/Button";
import { Input } from "../atoms/Input/Input";

interface ResetPasswordFormValues
{
  email: string;
}

interface Props
{
  readonly setProgress: Dispatch<SetStateAction<ResetPasswordModalProgress>>;
}

const ResetPasswordForm: FunctionComponent<Props> = ({ setProgress }) =>
{
  const [hasError, setHasError] = useState<boolean>(false);
  const form = useForm<ResetPasswordFormValues>({
    initialValues: {
      email: ""
    }
  });

  const handleSubmit = form.onSubmit(async (formValues) =>
  {
    try
    {
      const { error } = await supabase.auth.resetPasswordForEmail(formValues.email, {
        redirectTo: env.NEXT_PUBLIC_WEBSITE_URL + paths.recover,
      });

      if(error)
      {
        throw error;
      }
    }
    catch (error)
    {
      console.log(error);
      setHasError(true);
      form.setValues({ email: "" });
      return;
    }

    setProgress("success");
  });

  const emailFormInputProps = form.getInputProps("email");

  return (
    <div css={styles.wrapper}>
      <Title mb={16} order={3}>Passwort zurücksetzen</Title>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Stack spacing="spacing-24">
          <BodyText component="p" styleType="body-01-regular">
            You will receive an email from us with a link. Clicking this link will take you to a page where you can
            enter your new password.
          </BodyText>
          <Input
            inputType="text"
            label="Email"
            title="Email"
            {...emailFormInputProps}
            onChange={e =>
            {
              setHasError(false);
              emailFormInputProps.onChange(e.target.value);
            }}
          />
          {hasError && (
            <AlertCard variant="error">
              Da ist leider etwas schief gelaufen. Das Passwort konnte nicht zurückgesetzt werden. Bitte versuche es später erneut oder wende dich an den Support.
            </AlertCard>
          )}
          <Button<"button">
            styleType="primary"
            type="submit"
            disabled={!form.values.email || form.values.email.length === 0}>
            Zurücksetzen
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
