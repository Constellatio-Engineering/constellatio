import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { PasswordValidationSchema } from "@/components/helpers/PasswordValidationSchema";
import { updatePasswordFormSchema } from "@/schemas/auth/updatePasswordForm.schema";
import { supabase } from "@/supabase/client";

import { Box, Stack, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/router";
import { type FunctionComponent, useState } from "react";

export const UpdatePasswordForm: FunctionComponent = () =>
{
  const [isPasswordRevealed, { toggle }] = useDisclosure(false);
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const form = useForm({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
    validate: zodResolver(updatePasswordFormSchema),
    validateInputOnBlur: true,
  });

  const handleSubmit = form.onSubmit(async (formValues) =>
  {
    try
    {
      setSubmitting(true);
      await supabase.auth.updateUser({ password: formValues.password });
      await router.replace("/");
    }
    catch (error)
    {
      console.log("error updating password:", error);
    }
    finally
    {
      setSubmitting(false);
    }
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing="spacing-32">
          <Title order={3} align="center" c="neutrals-02.1">
            Set new password
          </Title>
          <Stack spacing="spacing-12">
            <Box>
              <Input
                inputType="password"
                label="Password"
                title="Password"
                {...form.getInputProps("password")}
                onVisibilityChange={toggle}
              />
              <PasswordValidationSchema passwordValue={form.values.password} isPasswordRevealed={isPasswordRevealed}/>
            </Box>
            <Input
              inputType="password"
              label="Confirm Password"
              title="Confirm Password"
              {...form.getInputProps("passwordConfirm")}
            />
          </Stack>
          <Button<"button">
            styleType="primary"
            type="submit"
            title="Reset Password"
            loading={submitting}>
            Reset Password
          </Button>
        </Stack>
      </form>
    </>
  );
};
