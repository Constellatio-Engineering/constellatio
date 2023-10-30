import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { AlertCard } from "@/components/atoms/Card/AlertCard";
import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import { Input } from "@/components/atoms/Input/Input";
import { colors } from "@/constants/styles/colors";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { supabase } from "@/lib/supabase";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { type LoginFormSchema, loginFormSchema } from "@/schemas/auth/loginForm.schema";
import { paths } from "@/utils/paths";
import { queryParams } from "@/utils/query-params";

import { Stack } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { AuthError } from "@supabase/gotrue-js";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router"; 
import { useTranslation } from "next-i18next";
import { type FunctionComponent, useEffect, useState } from "react";
import z from "zod";
import { makeZodI18nMap } from "zod-i18n-map";

import { ResetPasswordModal, resetPasswordModalVisible } from "../ResetPasswordModal/ResetPasswordModal";

type SignInError = "emailNotConfirmed" | "invalidCredentials" | "unknownError";

export const LoginForm: FunctionComponent = () =>
{
  const { t } = useTranslation();
  const router = useRouter();
  const wasPasswordUpdated = router.query[queryParams.passwordResetSuccess] === "true";
  const redirectTo = router.query[queryParams.redirectedFrom];
  const { invalidateEverything } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const [, setResetPasswordModalOpen] = useAtom(resetPasswordModalVisible);
  const [isLoginInProgress, setIsLoginInProgress] = useState(false);
  const [signInError, setSignInError] = useState<SignInError>();
  const form = useForm<LoginFormSchema>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(loginFormSchema),
    validateInputOnBlur: true,
  });

  useEffect(() =>
  {
    z.setErrorMap(makeZodI18nMap({ t }));
  }, [t]);

  const openResetPasswordModal = (): void => setResetPasswordModalOpen(true);

  const handleSubmit = form.onSubmit(async (formValues) =>
  {
    setIsLoginInProgress(true);

    try
    {
      const loginResult = await supabase.auth.signInWithPassword({
        email: formValues.email,
        password: formValues.password,
      });

      if(loginResult.error)
      {
        console.log("login failed", loginResult.error);
        throw loginResult.error;
      }

      await invalidateEverything();
      await router.replace(`${redirectTo || paths.dashboard}`);
    }
    catch (error)
    {
      if(!(error instanceof AuthError))
      {
        console.log("Something went wrong while logging in", error);
        setSignInError("unknownError");
        return;
      }

      switch (error.message)
      {
        case "Email not confirmed":
        {
          setSignInError("emailNotConfirmed");
          break;
        }
        case "Invalid login credentials":
        {
          setSignInError("invalidCredentials");
          break;
        }
        default:
        {
          console.log("error while logging in", error);
          setSignInError("unknownError");
          break;
        }
      }
    }
    finally
    {
      setIsLoginInProgress(false);
    }
  });

  return (
    <>
      {signInError === "emailNotConfirmed" && <AlertCard stylesOverwrite={{ marginBottom: "40px" }} variant="error">Du musst zuerst deine E-Mail-Adresse bestätigen. Eine Bestätigungsmail wurde dir zugesendet.</AlertCard>}
      {signInError === "invalidCredentials" && <AlertCard stylesOverwrite={{ marginBottom: "40px" }} variant="error">Wir konnten kein Konto mit diesen Anmeldedaten finden. Bitte überprüfe deine Eingaben.</AlertCard>}
      {signInError === "unknownError" && <AlertCard stylesOverwrite={{ marginBottom: "40px" }} variant="error">Es ist ein unbekannter Fehler aufgetreten. Bitte versuche es erneut.</AlertCard>}
      {wasPasswordUpdated && <AlertCard stylesOverwrite={{ marginBottom: "40px" }} variant="success">Dein Passwort wurde erfolgreich geändert. Du kannst dich jetzt mit deinem neuen Passwort anmelden.</AlertCard>}
      <form onSubmit={handleSubmit}>
        <Stack spacing="spacing-24">
          <Stack spacing="spacing-12">
            <Input
              inputType="text"
              label="E-Mail"
              title="E-Mail"
              {...form.getInputProps("email")}
            />
            <Input
              inputType="password"
              label="Passwort"
              title="Passwort"
              {...form.getInputProps("password")}
            />
          </Stack>
          <CustomLink
            styleType="link-secondary"
            component="button"
            onClick={openResetPasswordModal}
            stylesOverwrite={{ color: colors["neutrals-02"][2], textAlign: "left" }}>
            Passwort vergessen?
          </CustomLink>
          <CustomLink
            styleType="link-secondary"
            component={Link}
            href={paths.register}
            stylesOverwrite={{ color: colors["neutrals-02"][2], textAlign: "left" }}>
            Du hast noch kein Konto?
          </CustomLink>
          <Button<"button">
            styleType="primary"
            type="submit"
            title="Anmelden"
            loading={isLoginInProgress}>
            Anmelden
          </Button>
        </Stack>
      </form>
      <ResetPasswordModal/>
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
    </>
  );
};
