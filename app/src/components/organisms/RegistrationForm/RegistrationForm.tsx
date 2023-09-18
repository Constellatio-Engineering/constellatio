/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import { Dropdown } from "@/components/atoms/Dropdown/Dropdown";
import { Input } from "@/components/atoms/Input/Input";
import { PasswordValidationSchema } from "@/components/helpers/PasswordValidationSchema";
import { allGenders, allUniversities } from "@/components/organisms/RegistrationForm/RegistrationForm.data";
import { env } from "@/env.mjs";
import { maximumAmountOfSemesters, type RegistrationFormSchema, registrationFormSchema } from "@/schemas/RegistrationFormSchema";
import { supabase } from "@/supabase/client";
import { api } from "@/utils/api";
import { type PartialUndefined } from "@/utils/types";

import { Box, Stack } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { type FunctionComponent } from "react";
import z from "zod";
import { makeZodI18nMap } from "zod-i18n-map";

// this means for the initial values of the form, these keys can be null since these are dropdowns
type InitialValues = PartialUndefined<RegistrationFormSchema, "gender">;

let initialValues: InitialValues = {
  acceptTOS: false,
  displayName: "",
  email: "",
  firstName: "",
  gender: undefined,
  lastName: "",
  password: "",
  passwordConfirmation: "",
  semester: undefined,
  university: "",
};

if(env.NEXT_PUBLIC_NODE_ENV === "development")
{
  initialValues = {
    acceptTOS: true,
    displayName: "Constellatio Dev User",
    email: "devUser@constellatio-dummy-mail.de",
    firstName: "Dev",
    gender: allGenders[0]!.identifier,
    lastName: "User",
    password: "Super-secure-password-123",
    passwordConfirmation: "Super-secure-password-123",
    semester: "7",
    university: allUniversities[0] ?? "",
  };
}

export const RegistrationForm: FunctionComponent = () =>
{
  const { t } = useTranslation();
  z.setErrorMap(makeZodI18nMap({ t }));
  const router = useRouter();
  const [isPasswordRevealed, { toggle }] = useDisclosure(false);
  const form = useForm<InitialValues>({
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

  const handleSubmit = form.onSubmit(formValues => register(formValues as RegistrationFormSchema));

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="spacing-24">
        <Stack spacing="spacing-12">
          <Input
            {...form.getInputProps("firstName")}
            inputType="text"
            label="Vorname"
            title="Vorname"
            placeholder="Maximilian"
          />
          <Input
            {...form.getInputProps("lastName")}
            inputType="text"
            label="Nachname"
            title="Nachname"
            placeholder="Mustermann"
          />
          <Input
            {...form.getInputProps("displayName")}
            inputType="text"
            label="Anzeigename"
            title="Anzeigename"
            placeholder="Max"
          />
          <Input
            {...form.getInputProps("email")}
            inputType="text"
            label="E-Mail"
            title="E-Mail"
            placeholder="max.mustermann@mail.com"
          />
          <Box>
            <Input
              {...form.getInputProps("password")}
              inputType="password"
              label="Passwort"
              title="Passwort"
              placeholder={"*".repeat(16)}
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
            placeholder={"*".repeat(16)}
            title="Passwort bestätigen"
            onVisibilityChange={toggle}
          />
          <Dropdown
            {...form.getInputProps("university")}
            label="Universität"
            title="Universität"
            placeholder="Universität auswählen"
            data={allUniversities}
            searchable
          />
          <Box maw={240}>
            <Dropdown
              {...form.getInputProps("semester")}
              label="Semester"
              title="Semester"
              placeholder="Semester auswählen"
              data={Array(maximumAmountOfSemesters).fill(null).map((_, i) => String(i + 1))}
            />
          </Box>
          <Dropdown
            {...form.getInputProps("gender")}
            label="Geschlecht"
            title="Geschlecht"
            placeholder="Geschlecht auswählen"
            data={allGenders.map(gender => ({ label: gender.label, value: gender.identifier }))}
          />
          <Checkbox
            {...form.getInputProps("acceptTOS", { type: "checkbox" })}
            label={(
              <BodyText component="p" styleType="body-01-medium">
                Ich akzeptiere die&nbsp;
                <CustomLink styleType="link-primary" href="#">
                  Datenschutzerklärung
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
