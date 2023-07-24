import { useForm, zodResolver } from "@mantine/form";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { Box, Stack, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { Input } from "@/components/atoms/Input/Input";
import { Button } from "@/components/atoms/Button/Button";
import { PasswordValidationSchema } from "@/components/Helpers/PasswordValidationSchema";
import { useDisclosure } from "@mantine/hooks";
import { updatePasswordFormSchema } from "@/schemas/UpdatePasswordFormSchema";

export function UpdatePasswordForm() {
  const supabase = createPagesBrowserClient<Database>();
  const [isPasswordRevealed, { toggle }] = useDisclosure(false);

  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const form = useForm({
    validate: zodResolver(updatePasswordFormSchema),
    validateInputOnBlur: true,
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const handleSubmit = form.onSubmit(async (formValues) => {
    try {
      setSubmitting(true);
      await supabase.auth.updateUser({ password: formValues.password });
      await router.replace("/");
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={"spacing-32"}>
          <Title order={3} align="center" c={"neutrals-02.1"}>
            Set new password
          </Title>
          <Stack spacing={"spacing-12"}>
            <Box>
              <Input
                inputType="password"
                label="Password"
                title="Password"
                {...form.getInputProps("password")}
                onVisibilityChange={toggle}
              />
              <PasswordValidationSchema passwordValue={form.values.password} isPasswordRevealed={isPasswordRevealed} />
            </Box>
            <Input
              inputType="password"
              label="Confirm Password"
              title="Confirm Password"
              {...form.getInputProps("passwordConfirm")}
            />
          </Stack>
          <Button styleType="primary" type="submit" title={"Reset Password"} loading={submitting}>
            Reset Password
          </Button>
        </Stack>
      </form>
    </>
  );
}
