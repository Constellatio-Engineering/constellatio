/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import { Dropdown } from "@/components/atoms/Dropdown/Dropdown";
import { Input } from "@/components/atoms/Input/Input";
import { PasswordValidationSchema } from "@/components/helpers/PasswordValidationSchema";
import { Puzzle } from "@/components/Icons/Puzzle";
import { type GenderIdentifier } from "@/db/schema";
import { env } from "@/env.mjs";
import { type RegistrationFormSchema, registrationFormSchema } from "@/schemas/RegistrationFormSchema";
import { supabase } from "@/supabase/client";
import { api } from "@/utils/api";

import { Box, Stack } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
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

type Gender = {
  identifier: GenderIdentifier;
  label: string;
};

const allGenders: Gender[] = [
  {
    identifier: "male",
    label: "männliche"
  },
  {
    identifier: "female",
    label: "weiblich"
  },
  {
    identifier: "diverse",
    label: "divers"
  }
];

let initialValues: RegistrationFormSchema;

if(env.NEXT_PUBLIC_NODE_ENV === "development")
{
  initialValues = {
    acceptTOS: true,
    displayName: "Constellatio Dev User",
    email: "devUser@constellatio-dummy-mail.de",
    firstName: "Dev",
    gender: allGenders[0]!.identifier,
    lastName: "User",
    password: "super-secure-password-123",
    passwordConfirmation: "super-secure-password-123",
    semester: semesterData[3]?.value ?? "",
    university: universityData[0]?.value ?? "",
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

export const RegistrationForm: FunctionComponent = () =>
{
  const router = useRouter();
  const [isPasswordRevealed, { toggle }] = useDisclosure(false);
  const form = useForm<RegistrationFormSchema>({
    initialValues,
    validate: zodResolver(registrationFormSchema),
    validateInputOnBlur: true,
  });

  const { isLoading: isRegisterLoading, mutate: register } = api.authentication.register.useMutation({
    onError: e =>
    {
      if(e.data?.identifier === "email-already-taken")
      {
        form.setFieldError("email", "Diese E-Mail Adresse wird bereits verwendet");
        return;
      }

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

  const handleSubmit = form.onSubmit(formValues => register(formValues));

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="spacing-24">
        <Stack spacing="spacing-12">
          <Input
            {...form.getInputProps("firstName")}
            inputType="text"
            label="Vorname"
            title="Vorname"
          />
          <Input
            {...form.getInputProps("lastName")}
            inputType="text"
            label="Nachname"
            title="Nachname"
          />
          <Input
            {...form.getInputProps("displayName")}
            inputType="text"
            label="Anzeigename"
            title="Anzeigename"
          />
          <Input
            {...form.getInputProps("email")}
            inputType="text"
            label="E-Mail"
            title="E-Mail"
          />
          <Box>
            <Input
              {...form.getInputProps("password")}
              inputType="password"
              label="Passwort"
              title="Passwort"
              onVisibilityChange={toggle}
            />
            <PasswordValidationSchema
              passwordValue={form.values.password}
              isPasswordRevealed={isPasswordRevealed}
            />
          </Box>
          <Input
            {...form.getInputProps("passwordConfirmation")}
            inputType="password"
            label="Passwort bestätigen"
            title="Passwort bestätigen"
            onVisibilityChange={toggle}
          />
          <Dropdown
            {...form.getInputProps("university")}
            label="Universität"
            title="Universität"
            data={universityData}
          />
          <Box maw={240}>
            <Dropdown
              {...form.getInputProps("semester")}
              label="Semester"
              title="Semester"
              data={semesterData}
            />
          </Box>
          <Dropdown
            {...form.getInputProps("gender")}
            label="Geschlecht"
            title="Geschlecht"
            data={allGenders.map(gender => ({ label: gender.label, value: gender.identifier }))}
          />
          <Checkbox
            {...form.getInputProps("acceptTOS", { type: "checkbox" })}
            label={(
              <BodyText component="p" styleType="body-01-medium">
                I agree to the&nbsp;
                <CustomLink styleType="link-primary" href="#">
                  Data Protection Regulations
                </CustomLink>
              </BodyText>
            )}
            title="acceptTOS"
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
