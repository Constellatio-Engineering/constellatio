/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { AlertCard } from "@/components/atoms/Card/AlertCard";
import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import { Dropdown } from "@/components/atoms/Dropdown/Dropdown";
import { Input } from "@/components/atoms/Input/Input";
import { PasswordValidationSchema } from "@/components/helpers/PasswordValidationSchema";
import { allGenders, allUniversities } from "@/components/organisms/RegistrationForm/RegistrationForm.data";
import { colors } from "@/constants/styles/colors";
import { env } from "@/env.mjs";
import { supabase } from "@/lib/supabase";
import { maximumAmountOfSemesters, type RegistrationFormSchema, registrationFormSchema } from "@/schemas/auth/registrationForm.schema";
import { api } from "@/utils/api";
import { isDevelopment, isDevelopmentOrStaging } from "@/utils/env";
import { getConfirmEmailUrl } from "@/utils/paths";
import { type PartialUndefined } from "@/utils/types";

import { Box, Stack, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
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
  email: env.NEXT_PUBLIC_SIGN_UP_DEFAULT_EMAIL || (isDevelopment ? "devUser@constellatio-dummy-mail.de" : ""),
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
  const [countdown, setCountdown] = useState<number>(0);

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
        autoClose: false,
        color: "red",
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
          setShouldShowEmailConfirmationDialog(true);
          break;
        }
        case "signupComplete":
        {
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
      lastConfirmationEmailTimestamp.current = Date.now();
      // Start countdown again after sending email
      const intervalId = setInterval(() => 
      {
        const timeElapsed = lastConfirmationEmailTimestamp.current ? Date.now() - lastConfirmationEmailTimestamp.current : 0;
        const remainingTime = Math.max(0, 10 - Math.ceil(timeElapsed / 1000));
 
        setCountdown(remainingTime);
 
        if(remainingTime === 0) 
        {
          clearInterval(intervalId);
        }
      }, 1000);
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

  useEffect(() => 
  {
    const intervalId = setInterval(() => 
    {
      const timeElapsed = lastConfirmationEmailTimestamp?.current ? lastConfirmationEmailTimestamp?.current : 0;
      const remainingTime = Math.max(0, 10 - Math.ceil(timeElapsed / 1000));

      setCountdown(remainingTime);

      if(remainingTime === 0) 
      {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  
  if(shouldShowEmailConfirmationDialog)
  {
    return (
      <div style={{
        display: "flex", flexDirection: "column", gap: 24, placeItems: "center"
      }}>
        <Title ta="center" order={3}>Confirm your email</Title>
        {countdown > 0 && countdown < 10 && <AlertCard variant="error">You can send a confirmation email again after {countdown} seconds</AlertCard>}
        <div style={{ display: "grid", gap: "10px" }}>
          {/* <BodyText styleType="body-01-regular">Deine Registrierung war erfolgreich. Du musst jetzt noch deine E-Mail Adresse bestätigen. Bitte schaue in deinem Postfach nach einer E-Mail von uns. </BodyText> */}
          <BodyText ta="center" styleType="body-01-regular">We have sent an email to <strong>{form.values.email}</strong>. Click on the link to activate your account.</BodyText>
          {/* <BodyText styleType="body-01-regular">Nach erfolgreicher Bestätigung kannst du dich mit deinem neuen Account einloggen.</BodyText> */}
        </div>
        {/* <BodyText ta="center" styleType="body-01-regular">Keine E-Mail erhalten? Drücke auf den Button, um eine neue E-Mail zu erhalten.</BodyText> */}
        {/* <Button<"button"> styleType="tertiary" onClick={resendConfirmationEmail}>
            E-Mail erneut senden
          </Button> */}
        <Link href="/login" passHref>
          <Button<"button"> styleType="primary">
            Go to Sign in page
          </Button>
        </Link>
        {/* <Link href="/login" passHref>
          <Button<"button"> styleType="primary">
            Weiter zum Login
          </Button>
        </Link> */}
        
        <BodyText
          pos="absolute"
          bottom={48}
          ta="center"
          styleType="body-01-regular">
          Did not receive an email?{" "}
          <CustomLink styleType="link-primary" href="#" onClick={resendConfirmationEmail}>Send again</CustomLink>
        </BodyText>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {isDevelopmentOrStaging && (
        <p style={{ fontStyle: "italic", marginBottom: 30 }}>
          Note from developers: Form is only pre filled in development and staging, not in production.
        </p>
      )}
      <Stack spacing="spacing-24">
        <Stack spacing="spacing-12">
          <CustomLink
            styleType="link-secondary"
            component="button"
            onClick={() => void router.push(paths.login)}
            stylesOverwrite={{ color: colors["neutrals-02"][2], textAlign: "left" }}>
            Du hast schon ein Konto?
          </CustomLink>
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
      <BodyText
        mt={40}
        component="p"
        styleType="body-02-medium"
        ta="center"
        c="neutrals-01.7">
        Hinweis: Diese Version von Constellatio ist nur für die Verwendung am Computer optimiert.
        Wenn du technische Fragen hast, wende dich bitte an unseren
        Support unter&nbsp;
        <CustomLink
          href="mailto:webmaster@constellatio.de"
          styleType="link-secondary"
          c="neutrals-01.7">
          webmaster@constellatio.de
        </CustomLink>
      </BodyText>
    </form>
  );
};
