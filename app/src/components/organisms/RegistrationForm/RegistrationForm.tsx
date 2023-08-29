import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import { Dropdown } from "@/components/atoms/Dropdown/Dropdown";
import { Input } from "@/components/atoms/Input/Input";
import { PasswordValidationSchema } from "@/components/helpers/PasswordValidationSchema";
import { Puzzle } from "@/components/Icons/Puzzle";
import { env } from "@/env.mjs";
import { type RegistrationFormSchema, registrationFormSchema } from "@/schemas/RegistrationFormSchema";
import { api } from "@/utils/api";

import { Box, Stack } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { type FunctionComponent } from "react";

const universityData = [
  { icon: <Puzzle/>, label: "HdM Stuttgart", value: "hdm-stuttgart" },
  { icon: <Puzzle/>, label: "TU München", value: "tu-muenchen" },
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
  const [isPasswordRevealed, { toggle }] = useDisclosure(false);

  const { isLoading: isRegisterLoading, mutate: register } = api.authentication.register.useMutation({
    onError: e =>
    {
      console.log("error while register:", e);
      notifications.show({
        message: "We couldn't sign you up. Please try again.",
        title: "Oops!",
      });
    },
    onSuccess: async data =>
    {
      console.log("registered successfully", data);
      await supabase.auth.setSession(data);
      await router.replace("/");
    },
  });

  let initialValues: RegistrationFormSchema;

  console.log(env.NEXT_PUBLIC_NODE_ENV);

  if(env.NEXT_PUBLIC_NODE_ENV === "development")
  {
    initialValues = {
      acceptTOS: false,
      displayName: "Constellatio Dev User",
      email: "devUser@constellatio-dummy-mail.de",
      firstName: "Dev",
      gender: "male",
      lastName: "User",
      password: "super-secure-password-123",
      passwordConfirmation: "super-secure-password-123",
      semester: undefined,
      university: "HdM Stuttgart",
    };

  }
  else
  {
    initialValues = {
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
    };
  }

  const form = useForm<RegistrationFormSchema>({
    initialValues,
    validate: zodResolver(registrationFormSchema),
    validateInputOnBlur: true,
  });

  const handleSubmit = form.onSubmit(formValues => register(formValues));

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
        <Button<"button">
          styleType="primary"
          fullWidth
          type="submit"
          title="Konto erstellen"
          loading={isRegisterLoading}>
          Konto erstellen
        </Button>
      </Stack>
    </form>
  );
};
