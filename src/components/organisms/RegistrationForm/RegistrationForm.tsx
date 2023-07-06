import { useForm, zodResolver } from "@mantine/form";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../lib/database.types";
import { notifications } from "@mantine/notifications";
import {
  Button,
  Checkbox,
  Group,
  NumberInput,
  PasswordInput,
  Progress,
  Stack,
  TextInput,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { registrationFormSchema } from "@/schemas/RegistrationFormSchema";

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
  const supabase = createPagesBrowserClient();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const form = useForm({
    validate: zodResolver(registrationFormSchema),
    validateInputOnBlur: true,
    initialValues: {
      firstName: "",
      lastName: "",
      displayName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      university: "",
      semester: undefined,
      gender: "",
      acceptTOS: false,
    },
  });

  const handleSubmit = form.onSubmit(async (formValues) => {
    try {
      setSubmitting(true);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(formValues),
      });

      const data = await response.json();

      await supabase.auth.setSession(data);
      await router.replace("/");
    } catch (error) {
      notifications.show({
        title: "Oops!",
        message: "We couldn't sign you up. Please try again.",
      });
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
    <form onSubmit={handleSubmit}>
      <Stack mt={32}>
        <TextInput label="Vorname" {...form.getInputProps("firstName")} />
        <TextInput label="Nachname" {...form.getInputProps("lastName")} />
        <TextInput label="Anzeigename" {...form.getInputProps("displayName")} />
        <TextInput label="E-Mail Adresse" {...form.getInputProps("email")} />
        <div>
          <PasswordInput label="Passwort" {...form.getInputProps("password")} />
          <Group spacing={5} grow mt="xs" mb="md">
            {bars}
          </Group>
        </div>
        <PasswordInput
          label="Passwort bestätigen"
          {...form.getInputProps("passwordConfirmation")}
        />
        <TextInput label="Universität" {...form.getInputProps("university")} />
        <NumberInput label="Semester" {...form.getInputProps("semester")} />
        <TextInput label="Geschlecht" {...form.getInputProps("gender")} />
        <Checkbox
          label="I agree to the data protection regulations"
          {...form.getInputProps("acceptTOS")}
        />
        <Button color="dark" type="submit" radius="sm" loading={submitting}>
          Konto erstellen
        </Button>
      </Stack>
    </form>
  );
}
