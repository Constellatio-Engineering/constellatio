import { useForm, zodResolver } from "@mantine/form";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { notifications } from "@mantine/notifications";
import { Box, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { registrationFormSchema } from "@/schemas/RegistrationFormSchema";
import { Input } from "@/components/atoms/Input/Input";
import { Button } from "@/components/atoms/Button/Button";
import { useDisclosure } from "@mantine/hooks";
import { Dropdown } from "@/components/atoms/Dropdown/Dropdown";
import { Puzzle } from "@/components/Icons/Puzzle";
import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import { PasswordValidationSchema } from "@/components/Helpers/PasswordValidationSchema";

const universityData = [
  { label: "Menu list item", icon: <Puzzle />, value: "1" },
  { label: "Menu list item", icon: <Puzzle />, value: "2" },
  { label: "Menu list item", icon: <Puzzle />, value: "3" },
  { label: "Menu list item", icon: <Puzzle />, value: "4" },
  { label: "Menu list item", icon: <Puzzle />, value: "5" },
];

const semesterData = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "Graduate", value: "9" },
];

const genderData = [
  { label: "male", value: "1" },
  { label: "female", value: "2" },
  { label: "other", value: "3" },
];

export function RegistrationForm() {
  const supabase = createPagesBrowserClient();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [isPasswordRevealed, { toggle }] = useDisclosure(false);
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

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={"spacing-24"}>
        <Stack spacing={"spacing-12"}>
          <Input inputType="text" label="Vorname" title="Vorname" {...form.getInputProps("firstName")} />
          <Input inputType="text" label="Nachname" title="Nachname" {...form.getInputProps("lastName")} />
          <Input inputType="text" label="Anzeigename" title="Anzeigename" {...form.getInputProps("displayName")} />
          <Box>
            <Input
              inputType="password"
              label="Passwort"
              title="Passwort"
              onVisibilityChange={toggle}
              {...form.getInputProps("password")}
            />
            <PasswordValidationSchema passwordValue={form.values.password} isPasswordRevealed={isPasswordRevealed} />
          </Box>
          <Input
            inputType="password"
            label="Passwort bestätigen"
            title="Passwort bestätigen"
            {...form.getInputProps("passwordConfirmation")}
            onVisibilityChange={toggle}
          />
          <Dropdown
            label="Universität"
            title="Universität"
            {...form.getInputProps("university")}
            data={universityData}
          />
          <Box maw={240}>
            <Dropdown label="Semester" title="Semester" {...form.getInputProps("semester")} data={semesterData} />
          </Box>
          <Dropdown label="Geschlecht" title="Geschlecht" {...form.getInputProps("Geschlecht")} data={genderData} />
          <Checkbox
            label={
              <BodyText  component="p" styleType="body-01-medium">
                I agree to the&nbsp;
                <CustomLink styleType="link-primary" href="#">
                  Data Protection Regulations
                </CustomLink>
              </BodyText>
            }
            title="acceptTOS"
            {...form.getInputProps("acceptTOS")}
          />
        </Stack>

        <Button styleType="primary" fullWidth type="submit" title={"Konto erstellen"} loading={submitting}>
          Konto erstellen
        </Button>
      </Stack>
    </form>
  );
}
