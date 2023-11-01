/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import DisplayNameInput from "@/components/organisms/RegistrationForm/form/DisplayNameInput";
import EmailInput from "@/components/organisms/RegistrationForm/form/EmailInput";
import FirstNameInput from "@/components/organisms/RegistrationForm/form/FirstNameInput";
import GenderDropdown, { allGenders } from "@/components/organisms/RegistrationForm/form/GenderDropdown";
import LastNameInput from "@/components/organisms/RegistrationForm/form/LastNameInput";
import PasswordInput from "@/components/organisms/RegistrationForm/form/PasswordInput";
import SemesterDropdown from "@/components/organisms/RegistrationForm/form/SemesterDropdown";
import UniversityDropdown from "@/components/organisms/RegistrationForm/form/UniversityDropdown";
import { colors } from "@/constants/styles/colors";
import { env } from "@/env.mjs";
import { supabase } from "@/lib/supabase";
import { type RegistrationFormSchema, registrationFormSchema } from "@/schemas/auth/registrationForm.schema";
import { allUniversities } from "@/schemas/auth/userData.validation";
import { api } from "@/utils/api";
import { isDevelopment, isDevelopmentOrStaging } from "@/utils/env";
import { getConfirmEmailUrl, paths } from "@/utils/paths";

import { Stack, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { type FunctionComponent, useEffect, useRef, useState } from "react";
import z from "zod";
import { makeZodI18nMap } from "zod-i18n-map";

const initialValues: RegistrationFormSchema = isDevelopmentOrStaging ? {
  acceptTOS: true,
  displayName: "Constellatio Test User",
  email: env.NEXT_PUBLIC_SIGN_UP_DEFAULT_EMAIL || (isDevelopment ? "devUser@constellatio-dummy-mail.de" : ""),
  firstName: "Test",
  gender: allGenders[0]!.identifier,
  lastName: "User",
  password: "Super-secure-password-123",
  passwordConfirmation: "Super-secure-password-123",
  semester: "7",
  university: allUniversities[20] ?? null,
} : {
  acceptTOS: false,
  displayName: "",
  email: "",
  firstName: "",
  gender: null,
  lastName: "",
  password: "",
  passwordConfirmation: "",
  semester: null,
  university: null,
};

const resendEmailConfirmationTimeout = env.NEXT_PUBLIC_RESEND_EMAIL_CONFIRMATION_TIMEOUT_IN_SECONDS * 1000;

export const RegistrationForm: FunctionComponent = () =>
{
  const { t } = useTranslation();
  const router = useRouter();
  const form = useForm<RegistrationFormSchema>({
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
        autoClose: false,
        color: "red",
        message: "Das Konto konnte nicht erstellt werden. Bitte versuche es nochmal.",
        title: "Oops!",
      });
    },
    onSuccess: async result =>
    {
      switch (result.resultType)
      {
        case "emailConfirmationRequired":
        {
          void setShouldShowEmailConfirmationDialog(true);
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
    if(lastConfirmationEmailTimestamp.current && (Date.now() - lastConfirmationEmailTimestamp.current < resendEmailConfirmationTimeout))
    {
      notifications.show({
        color: "red",
        message: `Bitte warte mindestens ${env.NEXT_PUBLIC_RESEND_EMAIL_CONFIRMATION_TIMEOUT_IN_SECONDS} Sekunden, bevor du eine weitere E-Mail anforderst`,
        title: "Einen Moment...",
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
        color: "red",
        message: "Deine Bestätigungs-E-Mail konnte nicht erneut gesendet werden. Bitte versuche es später erneut.",
        title: "Ups!",
      });
      return;
    }

    notifications.show({
      color: "green",
      message: "Deine Bestätigungs-E-Mail wurde erneut gesendet.",
      title: "E-Mail gesendet!",
    });
  };
  
  if(shouldShowEmailConfirmationDialog)
  {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        marginTop: 40,
        placeItems: "center"
      }}>
        <Title ta="center" order={3}>Bestätige deine E-Mail Adresse</Title>
        <div style={{ display: "grid", gap: "10px" }}>
          <BodyText ta="center" styleType="body-01-regular">
            Wir haben eine E-Mail an {form.values.email ? <strong>{form.values.email}</strong> : "deine E-Mail Adresse"} geschickt.
            Klicke auf den Link, um deinen Account zu aktivieren.
          </BodyText>
          <BodyText ta="center" styleType="body-01-regular">
            Nach erfolgreicher Bestätigung kannst du dich mit deinem neuen Account einloggen.
          </BodyText>
        </div>
        <Link href="/login" passHref>
          <Button<"button"> styleType="primary">
            Weiter zum Login
          </Button>
        </Link>
        <BodyText
          pos="absolute"
          bottom={48}
          ta="center"
          styleType="body-01-regular">
          Du hast keine E-Mail erhalten?{" "}
          <CustomLink
            styleType="link-primary"
            onClick={async (e) =>
            {
              e.preventDefault();
              await resendConfirmationEmail();
            }}>
            Neue E-Mail anfordern
          </CustomLink>
        </BodyText>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="spacing-24">
        <Stack spacing="spacing-12">
          <CustomLink
            styleType="link-secondary"
            component={Link}
            href={paths.login}
            stylesOverwrite={{ color: colors["neutrals-02"][2], marginBottom: 10, textAlign: "left" }}>
            Du hast schon ein Konto?
          </CustomLink>
          <FirstNameInput {...form.getInputProps("firstName")}/>
          <LastNameInput {...form.getInputProps("lastName")}/>
          <DisplayNameInput {...form.getInputProps("displayName")}/>
          <EmailInput {...form.getInputProps("email")}/>
          <PasswordInput
            passwordInputProps={form.getInputProps("password")}
            confirmPasswordInputProps={form.getInputProps("passwordConfirmation")}
            passwordToValidate={form.values.password}
          />
          <UniversityDropdown {...form.getInputProps("university")}/>
          <SemesterDropdown {...form.getInputProps("semester")}/>
          <GenderDropdown {...form.getInputProps("gender")}/>
          <Checkbox
            {...form.getInputProps("acceptTOS", { type: "checkbox" })}
            label={(
              <BodyText component="p" styleType="body-01-medium">
                Ich akzeptiere die&nbsp;
                <CustomLink styleType="link-primary" href="https://www.constellatio.de/agb">Allgemeinen Geschäftsbedingungen</CustomLink>
                &nbsp;und die&nbsp;
                <CustomLink styleType="link-primary" href="https://www.constellatio.de/datenschutzerklaerung">Datenschutzerklärung</CustomLink>
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
