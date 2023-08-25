import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import { Dropdown } from "@/components/atoms/Dropdown/Dropdown";
import { Input } from "@/components/atoms/Input/Input";
import { PasswordValidationSchema } from "@/components/helpers/PasswordValidationSchema";
import { Puzzle } from "@/components/Icons/Puzzle";
import { registrationFormSchema } from "@/schemas/RegistrationFormSchema";

import { Box, Stack } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { type FunctionComponent, useState } from "react";

const universityData = [
  { icon: <Puzzle/>, label: "Menu list item", value: "1" },
  { icon: <Puzzle/>, label: "Menu list item", value: "2" },
  { icon: <Puzzle/>, label: "Menu list item", value: "3" },
  { icon: <Puzzle/>, label: "Menu list item", value: "4" },
  { icon: <Puzzle/>, label: "Menu list item", value: "5" },
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

export const RegistrationForm: FunctionComponent = () =>
{
  const supabase = createPagesBrowserClient();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [isPasswordRevealed, { toggle }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      acceptTOS: false,
      displayName: "",
      email: "",
      firstName: "",
      gender: "",
      lastName: "",
      password: "",
      passwordConfirmation: "",
      semester: undefined,
      university: "",
    },
    validate: zodResolver(registrationFormSchema),
    validateInputOnBlur: true,
  });

  const handleSubmit = form.onSubmit(async (formValues) =>
  {
    try
    {
      setSubmitting(true);

      const response = await fetch("/api/auth/register", {
        body: JSON.stringify(formValues),
        method: "POST",
      });

      // TODO: Add type safety
      const data = await response.json() as any;
      await supabase.auth.setSession(data);
      await router.replace("/");
    }
    catch (error)
    {
      notifications.show({
        message: "We couldn't sign you up. Please try again.",
        title: "Oops!",
      });
    }
    finally
    {
      setSubmitting(false);
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="spacing-24">
        <Stack spacing="spacing-12">
          <Input
            inputType="text"
            label="Vorname"
            title="Vorname"
            {...form.getInputProps("firstName")}
          />
          <Input
            inputType="text"
            label="Nachname"
            title="Nachname"
            {...form.getInputProps("lastName")}
          />
          <Input
            inputType="text"
            label="Anzeigename"
            title="Anzeigename"
            {...form.getInputProps("displayName")}
          />
          <Box>
            <Input
              inputType="password"
              label="Passwort"
              title="Passwort"
              onVisibilityChange={toggle}
              {...form.getInputProps("password")}
            />
            <PasswordValidationSchema passwordValue={form.values.password} isPasswordRevealed={isPasswordRevealed}/>
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
            <Dropdown
              label="Semester"
              title="Semester"
              {...form.getInputProps("semester")}
              data={semesterData}
            />
          </Box>
          <Dropdown
            label="Geschlecht"
            title="Geschlecht"
            {...form.getInputProps("Geschlecht")}
            data={genderData}
          />
          <Checkbox
            label={(
              <BodyText component="p" styleType="body-01-medium">
                I agree to the&nbsp;
                <CustomLink styleType="link-primary" href="#">
                  Data Protection Regulations
                </CustomLink>
              </BodyText>
            )}
            title="acceptTOS"
            {...form.getInputProps("acceptTOS")}
          />
        </Stack>
        <Button
          styleType="primary"
          fullWidth
          type="submit"
          title="Konto erstellen"
          loading={submitting}>
          Konto erstellen
        </Button>
      </Stack>
    </form>
  );
};
