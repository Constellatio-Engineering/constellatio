/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import MaterialsLabel from "@/components/atoms/materialsLabel/MaterialsLabel";
import { FormFull } from "@/components/organisms/RegistrationForm/form/FormFull";
import { FormMinimal } from "@/components/organisms/RegistrationForm/form/FormMinimal";
import { allGenders } from "@/components/organisms/RegistrationForm/form/GenderDropdown";
import { colooors } from "@/constants/styles/colors";
import { env } from "@/env.mjs";
import { supabase } from "@/lib/supabase";
import useAuthPageStore from "@/stores/authPage.store";
import { api } from "@/utils/api";

import { isDevelopment, isDevelopmentOrStaging } from "@constellatio/env";
import { allUniversities } from "@constellatio/schemas/common/auth/userData.validation";
import { registrationFormSchema, type RegistrationFormSchema } from "@constellatio/schemas/routers/auth/registrationForm.schema";
import { registrationFormMinimalSchema, type RegistrationFormMinimalSchema } from "@constellatio/schemas/routers/auth/registrationFormMinimal.schema";
import { appPaths, authPaths, getConfirmEmailUrl } from "@constellatio/shared/paths";
import { Stack, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { sendGTMEvent } from "@next/third-parties/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { type FunctionComponent, useEffect, useRef, useState } from "react";

import * as styles from "./RegistrationForm.styles";
const resendEmailConfirmationTimeout = env.NEXT_PUBLIC_RESEND_EMAIL_CONFIRMATION_TIMEOUT_IN_SECONDS * 1000;

export type SignupFormVariant = "full" | "minimal";

type Props = {
  readonly formVariant: SignupFormVariant;
};

export const RegistrationForm: FunctionComponent<Props> = ({ formVariant }) =>
{
  const router = useRouter();
  const { ref_code: inputRefCode } = router.query;
  const refCode = (inputRefCode && typeof inputRefCode === "string") ? inputRefCode : undefined;
  const [shouldShowEmailConfirmationDialog, setShouldShowEmailConfirmationDialog] = useState<boolean>(false);
  const lastConfirmationEmailTimestamp = useRef<number>();
  const lastEnteredPassword = useAuthPageStore(s => s.lastEnteredPassword);
  const lastEnteredEmail = useAuthPageStore(s => s.lastEnteredEmail);

  const formFull = useForm<RegistrationFormSchema>({
    initialValues: isDevelopmentOrStaging ? {
      acceptTOS: true,
      displayName: "Constellatio Test User",
      email: lastEnteredEmail || env.NEXT_PUBLIC_SIGN_UP_DEFAULT_EMAIL || (isDevelopment ? "devUser@constellatio-dummy-mail.de" : ""),
      firstName: "Test",
      gender: allGenders[0]!.identifier,
      lastName: "User",
      password: lastEnteredPassword || "Super-secure-password-123",
      passwordConfirmation: lastEnteredPassword || "Super-secure-password-123",
      refCode,
      semester: "7",
      university: allUniversities[20]!.name ?? null,
    } : {
      acceptTOS: false,
      displayName: "",
      email: lastEnteredEmail,
      firstName: "",
      gender: null,
      lastName: "",
      password: lastEnteredPassword,
      passwordConfirmation: "",
      refCode,
      semester: null,
      university: null,
    },
    validate: zodResolver(registrationFormSchema),
    validateInputOnBlur: true,
  });

  const formMinimal = useForm<RegistrationFormMinimalSchema>({
    initialValues: isDevelopmentOrStaging ? {
      displayName: "Constellatio Test User",
      email: lastEnteredEmail || env.NEXT_PUBLIC_SIGN_UP_DEFAULT_EMAIL || (isDevelopment ? "devUser@constellatio-dummy-mail.de" : ""),
      password: lastEnteredPassword || "Super-secure-password-123",
      refCode,
    } : {
      displayName: "",
      email: lastEnteredEmail,
      password: lastEnteredPassword,
      refCode,
    },
    validate: zodResolver(registrationFormMinimalSchema),
    validateInputOnBlur: true,
  });

  const { data: referringUserNameResult } = api.referral.getReffererByCode.useQuery({
    code: refCode!
  }, {
    enabled: refCode != null,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });

  const referringUserName = referringUserNameResult?.displayName;

  useEffect(() =>
  {
    const currentSubscription = supabase.auth.onAuthStateChange((event, _session) =>
    {
      if(event === "SIGNED_IN")
      {
        window.location.replace(appPaths.dashboard);
      }
    });

    return () => currentSubscription?.data.subscription.unsubscribe();
  }, []);

  useEffect(() =>
  {
    useAuthPageStore.setState({
      lastEnteredEmail: formFull.values.email,
      lastEnteredPassword: formFull.values.password,
    });
  }, [formFull.values.email, formFull.values.password]);

  useEffect(() =>
  {
    useAuthPageStore.setState({
      lastEnteredEmail: formMinimal.values.email,
      lastEnteredPassword: formMinimal.values.password,
    });
  }, [formMinimal.values.email, formMinimal.values.password]);

  const { isPending: isRegisterLoading, mutate: register } = api.authentication.register.useMutation({
    onError: e =>
    {
      if(e.data?.clientError.identifier === "email-already-taken")
      {
        formFull.setFieldError("email", "Diese E-Mail-Adresse wird bereits verwendet");
        formMinimal.setFieldError("email", "Diese E-Mail-Adresse wird bereits verwendet");
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
    onSuccess: async (result, variables) =>
    {
      sendGTMEvent({
        email: variables.email,
        event: "sign_up", 
        formVariant,
        method: "E-Mail"
      });

      switch (result.resultType)
      {
        case "emailConfirmationRequired":
        {
          void setShouldShowEmailConfirmationDialog(true);
          await supabase.auth.startAutoRefresh();
          break;
        }
        case "signupComplete":
        {
          await supabase.auth.setSession(result.session);
          window.location.replace(appPaths.dashboard);
          break;
        }
      }
    },
  });

  const handleFullFormSubmit = formFull.onSubmit(formValues => register(formValues as RegistrationFormSchema));
  const handleMinimalFormSubmit = formMinimal.onSubmit(formValues => register(formValues as RegistrationFormMinimalSchema));

  const formEmailInput = formVariant === "full" ? formFull.values.email : formMinimal.values.email;

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
      email: formEmailInput,
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
            Wir haben eine E-Mail an {formEmailInput ? <strong>{formEmailInput}</strong> : "deine E-Mail Adresse"} geschickt.
            Klicke auf den Link, um deinen Account zu aktivieren.
          </BodyText>
          <BodyText ta="center" styleType="body-01-regular">
            <strong>Bitte überprüfe auch deinen Spam-Ordner.</strong>
          </BodyText>
          <BodyText ta="center" styleType="body-01-regular">
            Sofern du den Link in diesem Browser öffnest, wirst du automatisch eingeloggt.
            Öffnest du den Link hingegen auf deinem Smartphone, musst du dich nach der Bestätigung manuell einloggen.
            Klicke <Link href={authPaths.login} css={styles.inlineLink}>hier</Link>, um dich manuell einzuloggen.
          </BodyText>
        </div>
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
    <form onSubmit={formVariant === "full" ? handleFullFormSubmit : handleMinimalFormSubmit}>
      <Stack spacing="spacing-24">
        <Stack spacing="spacing-12">
          {formVariant === "full" && (
            <CustomLink
              styleType="link-secondary"
              component={Link}
              href={authPaths.login}
              stylesOverwrite={{ color: colooors["neutrals-02"][2], marginBottom: 10, textAlign: "left" }}>
              Du hast schon ein Konto?
            </CustomLink>
          )}
          {referringUserName && (
            <div>
              <MaterialsLabel title={`Eingeladen von: ${referringUserName}`} variant="heart"/>
            </div>
          )}
          {formVariant === "full" ? (
            <FormFull form={formFull}/>
          ) : (
            <FormMinimal form={formMinimal}/>
          )}
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
      {formVariant === "full" && (
        <BodyText
          mt={30}
          component="p"
          styleType="body-02-medium"
          ta="left"
          c="neutrals-01.7">
          Hinweis: Diese Version von Constellatio ist nur für die Verwendung am Computer optimiert.
          Wenn du technische Fragen hast, wende dich bitte an unseren Support unter&nbsp;
          <CustomLink
            href="mailto:gutentag@constellatio.de"
            styleType="link-secondary"
            c="neutrals-01.7">
            gutentag@constellatio.de
          </CustomLink>
        </BodyText>
      )}
    </form>
  );
};
