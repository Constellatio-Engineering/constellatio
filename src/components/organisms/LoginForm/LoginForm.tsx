import { useForm, zodResolver } from "@mantine/form";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../lib/database.types";
import { notifications } from "@mantine/notifications";
import {
  Anchor,
  Button,
  Group,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import {
  ResetPasswordModal,
  resetPasswordModalVisible,
} from "../ResetPasswordModal/ResetPasswordModal";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useState } from "react";
import { loginFormSchema } from "../../../schemas/LoginFormSchema";

export function LoginForm() {
  const [_, setResetPasswordModalOpen] = useAtom(resetPasswordModalVisible);
  const supabase = createPagesBrowserClient<Database>();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const form = useForm({
    validate: zodResolver(loginFormSchema),
    validateInputOnBlur: true,
    initialValues: {
      email: "",
      password: "",
    },
  });

  const openResetPasswordModal = () => setResetPasswordModalOpen(true);

  const handleSubmit = form.onSubmit(async (formValues) => {
    try {
      setSubmitting(true);

      notifications.show({
        title: "Login handler",
        message: "The login handler was called",
      });

      await supabase.auth.signInWithPassword({
        email: formValues.email,
        password: formValues.password,
      });

      await router.replace("/");
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack mt={32}>
          <TextInput label="E-Mail Adresse" {...form.getInputProps("email")} />
          <PasswordInput label="Passwort" {...form.getInputProps("password")} />
          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              onClick={openResetPasswordModal}
              color="dimmed"
              size="xs"
            >
              Probleme beim Anmelden?
            </Anchor>
          </Group>
          <Button type="submit" color="neutrals-02.1" loading={submitting}>
            Login
          </Button>
        </Stack>
      </form>
      <ResetPasswordModal />
    </>
  );
}
