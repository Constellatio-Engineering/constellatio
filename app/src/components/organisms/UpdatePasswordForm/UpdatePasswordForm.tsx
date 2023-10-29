import { Button } from "@/components/atoms/Button/Button";
import { AlertCard } from "@/components/atoms/Card/AlertCard";
import { Input } from "@/components/atoms/Input/Input";
import { PasswordValidationSchema } from "@/components/helpers/PasswordValidationSchema";
import { supabase } from "@/lib/supabase";
import { type UpdatePasswordFormSchema, updatePasswordFormSchema } from "@/schemas/auth/updatePasswordForm.schema";
import { paths } from "@/utils/paths";
import { queryParams } from "@/utils/query-params";

import { Box, Stack, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { AuthApiError } from "@supabase/gotrue-js";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { type FunctionComponent } from "react";

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

  const { error, isLoading, mutate: updatePassword } = useMutation({
    mutationFn: async (password: string) =>
    {
      const updatePasswordResult = await supabase.auth.updateUser({ password });

      if(updatePasswordResult.error)
      {
        throw updatePasswordResult.error;
      }
    },
    onError: (error) => console.log("error updating password:", error),
    onSuccess: async () => router.replace(`${paths.login}?${queryParams.passwordResetSuccess}=true`),
  });

  let errorType: "unknownError" | "passwordsMatch" | null = null;

  if(error)
  {
    if(error instanceof AuthApiError && error.message === "New password should be different from the old password.")
    {
      errorType = "passwordsMatch";
    }
    else
    {
      errorType = "unknownError";
    }
  }

  return (
    <form onSubmit={form.onSubmit((formValues) => updatePassword(formValues.password))}>
      <Stack spacing="spacing-32">
        <Title order={3} align="center" c="neutrals-02.1">
          Neues Passwort
        </Title>
        {errorType === "passwordsMatch" && (
          <AlertCard variant="error">
            Das neue Passwort muss sich vom alten Passwort unterscheiden.
          </AlertCard>
        )}
        {errorType === "unknownError" && (
          <AlertCard variant="error">
            Da ist etwas schief gelaufen. Bitte versuche es erneut.
          </AlertCard>
        )}
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
