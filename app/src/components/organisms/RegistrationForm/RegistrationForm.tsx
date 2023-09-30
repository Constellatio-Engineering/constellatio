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
import { maximumAmountOfSemesters, type RegistrationFormSchema, registrationFormSchema } from "@/schemas/auth/registrationForm.schema";
import { api } from "@/utils/api";
import { isDevelopmentOrStaging } from "@/utils/env";
import { getConfirmEmailUrl } from "@/utils/paths";
import { type PartialUndefined } from "@/utils/types";

import { Box, Stack } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { type FunctionComponent, useEffect, useRef, useState } from "react";
import z from "zod";
import { makeZodI18nMap } from "zod-i18n-map";

// this means for the initial values of the form, these keys can be null since these are dropdowns
type InitialValues = PartialUndefined<RegistrationFormSchema, "gender">;

const initialValues: InitialValues = isDevelopmentOrStaging ? {
  acceptTOS: true,
  displayName: "Constellatio Test User",
  email: env.NEXT_PUBLIC_SIGN_UP_DEFAULT_EMAIL || (env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT === "development" ? "devUser@constellatio-dummy-mail.de" : ""),
  firstName: "Test",
  gender: allGenders[0]!.identifier,
  lastName: "User",
  password: "Super-secure-password-123",
  passwordConfirmation: "Super-secure-password-123",
  semester: "7",
  university: allUniversities[20] ?? "",
} : {
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

export const RegistrationForm: FunctionComponent = () =>
{
  const supabase = useSupabaseClient();
  const { t } = useTranslation();
  const router = useRouter();
  const [isPasswordRevealed, { toggle }] = useDisclosure(false);
  const form = useForm<InitialValues>({
    initialValues,
    validate: zodResolver(registrationFormSchema),
    validateInputOnBlur: true,
  });
  const [shouldShowEmailConfirmationDialog, setShouldShowEmailConfirmationDialog] = useState<boolean>(false);
  const lastConfirmationEmailTimestamp = useRef<number>();

  useEffect(() =>
  {
    z.setErrorMap(makeZodI18nMap({ t }));
  }, [t]);

  const { isLoading: isRegisterLoading, mutate: register } = api.authentication.register.useMutation({
    onError: e =>
    {
      if(e.data?.clientError.identifier === "email-already-taken")
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
    onSuccess: async result =>
    {
      switch (result.resultType)
      {
        case "emailConfirmationRequired":
        {
          console.log("email confirmation required");
          setShouldShowEmailConfirmationDialog(true);
          break;
        }
        case "signupComplete":
        {
          console.log("signup complete. redirecting to home page...");
          await supabase.auth.setSession(result.session);
          await router.replace("/");
          break;
        }
      }
    },
  });

  const handleSubmit = form.onSubmit(formValues => register(formValues as RegistrationFormSchema));

  const resendConfirmationEmail = async (): Promise<void> =>
  {
    if(lastConfirmationEmailTimestamp.current && (Date.now() - lastConfirmationEmailTimestamp.current < 10000))
    {
      notifications.show({
        message: "Bitte warte noch einen Moment, bevor du eine weitere E-Mail anforderst",
        title: "Ups!",
      });
      return;
    }

    lastConfirmationEmailTimestamp.current = Date.now();

    const { error } = await supabase.auth.resend({
      email: form.values.email,
      options: { emailRedirectTo: getConfirmEmailUrl() },
      type: "signup"
    });

    if(error)
    {
      notifications.show({
        message: "Deine Bestätigungs-E-Mail konnte nicht erneut gesendet werden. Bitte versuche es später erneut.",
        title: "Ups!",
      });
      return;
    }

    notifications.show({
      message: "Deine Bestätigungs-E-Mail wurde erneut gesendet.",
      title: "E-Mail gesendet!",
    });
  };

  if(shouldShowEmailConfirmationDialog)
  {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <h1>Bestätige deine E-Mail Adresse</h1>
        <p>Deine Registrierung war erfolgreich. Du musst jetzt noch deine E-Mail Adresse bestätigen. Bitte schaue in deinem Postfach nach einer E-Mail von uns.</p>
        <p>Nach erfolgreicher Bestätigung kannst du dich mit deinem neuen Account einloggen.</p>
        <p>Keine E-Mail erhalten? Drücke auf den Button, um eine neue E-Mail zu erhalten.</p>
        <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
          <Button<"button"> styleType="tertiary" onClick={resendConfirmationEmail}>
            E-Mail erneut senden
          </Button>
          <Link href="/login" passHref>
            <Button<"button"> styleType="primary">
              Weiter zum Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {isDevelopmentOrStaging && (
        <p style={{ fontStyle: "italic", marginBottom: 30 }}>Note from developers: Form is only pre filled in development and staging, not in production.</p>
      )}
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
