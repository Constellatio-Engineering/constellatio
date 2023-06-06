regiimport { useForm, zodResolver } from "@mantine/form";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../lib/database.types";
import { notifications } from "@mantine/notifications";
import {
  Anchor,
  Button,
  Group,
  PasswordInput,
  Progress,
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

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

export function RegistrationForm() {
  const [_, setResetPasswordModalOpen] = useAtom(resetPasswordModalVisible);
  const supabase = createPagesBrowserClient<Database>();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const form = useForm({
    validate: zodResolver(loginFormSchema),
    validateInputOnBlur: true,
    initialValues: {
      firstName: "",
      lastName: "",
      displayName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      university: "",
      semester: "",
      gender: "",
      acceptTOS: false,
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

  const strength = getStrength(form.values.password);

  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ bar: { transitionDuration: "0ms" } }}
        value={
          form.values.password.length > 0 && index === 0
            ? 100
            : strength >= ((index + 1) / 4) * 100
            ? 100
            : 0
        }
        color={strength > 80 ? "teal" : strength > 50 ? "yellow" : "red"}
        key={index}
        size={4}
      />
    ));

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack mt={32}>
          <TextInput label="Vorname" {...form.getInputProps("firstName")} />
          <TextInput label="Nachname" {...form.getInputProps("lastName")} />
          <TextInput
            label="Anzeigename"
            {...form.getInputProps("displayName")}
          />
          <TextInput label="E-Mail Adresse" {...form.getInputProps("email")} />
          <div>
            <PasswordInput
              label="Passwort"
              {...form.getInputProps("password")}
            />
            <Group spacing={5} grow mt="xs" mb="md">
              {bars}
            </Group>
          </div>
          <PasswordInput
            label="Passwort bestätigen"
            {...form.getInputProps("passwordConfirmation")}
          />
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
            <Button type="submit" radius="xl" loading={submitting}>
              Login
            </Button>
          </Group>
        </Stack>
      </form>
      <ResetPasswordModal />
    </>
  );
}
