import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { PasswordValidationSchema } from "@/components/helpers/PasswordValidationSchema";
import ErrorCard from "@/components/molecules/errorCard/ErrorCard";

import { Box, Stack, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { type FunctionComponent } from "react";

import * as styles from "./UpdatePasswordForm.styles";

import { supabase } from "@/lib/supabase";
import { type UpdatePasswordFormSchema, updatePasswordFormSchema } from "@/schemas/auth/updatePasswordForm.schema";
import { appPaths } from "@/utils/paths";

const initialValues: UpdatePasswordFormSchema = {
  password: "",
  passwordConfirm: "",
};

export const UpdatePasswordForm: FunctionComponent = () =>
{
  const router = useRouter();
  const [isPasswordRevealed, { toggle }] = useDisclosure(false);
  const form = useForm<UpdatePasswordFormSchema>({
    initialValues,
    validate: zodResolver(updatePasswordFormSchema),
    validateInputOnBlur: true,
  });

  const {
    error,
    isPending: isLoading,
    isSuccess: wasPasswordUpdateSuccessful,
    mutate: updatePassword
  } = useMutation({
    mutationFn: async (password: string) =>
    {
      const updatePasswordResult = await supabase.auth.updateUser({ password });

      if(updatePasswordResult.error)
      {
        throw updatePasswordResult.error;
      }
    },
    onError: (error) => console.log("error updating password:", error),
  });

  if(wasPasswordUpdateSuccessful)
  {
    return (
      <div css={styles.wrapper}>
        <Title order={2} css={styles.title}>
          Passwort erfolgreich geändert
        </Title>
        <BodyText
          styleType="body-01-regular"
          component="p"
          css={styles.text}>
          Dein Passwort wurde erfolgreich geändert. Klicke auf den folgenden Button, um zur Web-App weitergeleitet zu werden.
        </BodyText>
        <div css={styles.buttonWrapper}>
          <Button<"button">
            styleType="primary"
            onClick={async () => router.replace(appPaths.dashboard)}
            type="button">
            Weiter zur Web-App
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={form.onSubmit((formValues) => updatePassword(formValues.password))}>
      <Stack spacing="spacing-32">
        <Title order={3} align="center" c="neutrals-02.1">
          Neues Passwort
        </Title>
        <ErrorCard error={error} marginBottom={0}/>
        <Stack spacing="spacing-12">
          <Box>
            <Input
              {...form.getInputProps("password")}
              inputType="password"
              label="Neues Passwort"
              title="Neues Passwort"
              onVisibilityChange={toggle}
            />
            <PasswordValidationSchema
              passwordValue={form.values.password}
              isPasswordRevealed={isPasswordRevealed}
            />
          </Box>
          <Input
            {...form.getInputProps("passwordConfirm")}
            inputType="password"
            error={form.errors.passwordConfirm}
            label="Neues Passwort erneut eingeben"
            title="Neues Passwort erneut eingeben"
          />
        </Stack>
        <Button<"button">
          styleType="primary"
          type="submit"
          title="Reset Password"
          loading={isLoading}>
          Passwort zurücksetzen
        </Button>
      </Stack>
    </form>
  );
};
