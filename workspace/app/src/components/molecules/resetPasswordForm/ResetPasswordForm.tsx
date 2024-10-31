import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import ErrorCard from "@/components/molecules/errorCard/ErrorCard";
import { type ResetPasswordModalProgress } from "@/components/organisms/ResetPasswordModal/ResetPasswordModal";
import { env } from "@/env.mjs";
import { supabase } from "@/lib/supabase";

import { resetPasswordFormSchema } from "@constellatio/schemas/routers/auth/resetPassword.schema";
import { authPaths } from "@constellatio/shared/paths";
import { Stack, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { type Dispatch, type FunctionComponent, type SetStateAction, useState } from "react";

import * as styles from "./ResetPasswordForm.styles";

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
  const [error, setError] = useState<unknown | null>(null);
  const form = useForm<ResetPasswordFormValues>({
    initialValues: {
      email: ""
    },
    validate: zodResolver(resetPasswordFormSchema),
    validateInputOnBlur: true,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = form.onSubmit(async (formValues) =>
  {
    setIsLoading(true);

    try
    {
      const { error } = await supabase.auth.resetPasswordForEmail(formValues.email, {
        redirectTo: env.NEXT_PUBLIC_WEBSITE_URL + authPaths.recover,
      });

      if(error)
      {
        throw error;
      }
    }
    catch (error)
    {
      console.log(error);
      setError(error);
      form.setValues({ email: "" });
      return;
    }
    finally
    {
      setIsLoading(false);
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
            Wir senden dir eine E-Mail mit einem Link. Wenn du auf diesen Link klickst, kannst du dein neues Passwort eingeben.
          </BodyText>
          <Input
            inputType="text"
            label="E-Mail"
            title="E-Mail"
            {...emailFormInputProps}
            onChange={e =>
            {
              setError(null);
              emailFormInputProps.onChange(e.target.value);
            }}
          />
          <ErrorCard
            error={error}
            overwriteErrorMessages={{
              tooManyRequests: "Bitte warte mindestens 60 Sekunden, bevor du es erneut versuchst.",
              unknownError: "Da ist leider etwas schief gelaufen. Das Passwort konnte nicht zurückgesetzt werden. Bitte versuche es später erneut oder wende dich an den Support.",
            }}
          />
          <Button<"button">
            styleType="primary"
            type="submit"
            loading={isLoading}
            disabled={!form.values.email || form.values.email.length === 0}>
            Zurücksetzen
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
