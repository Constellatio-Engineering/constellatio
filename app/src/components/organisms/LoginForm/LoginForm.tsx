/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { AlertCard } from "@/components/atoms/Card/AlertCard";
import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import { Input } from "@/components/atoms/Input/Input";
import ErrorCard from "@/components/molecules/errorCard/ErrorCard";
import { colooors } from "@/constants/styles/colors";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { useResendConfirmationEmail } from "@/hooks/useResendConfirmationEmail";
import { supabase } from "@/lib/supabase";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { loginFormSchema, type LoginFormSchema } from "@/schemas/auth/loginForm.schema";
import useAuthPageStore from "@/stores/authPage.store";
import { appPaths, authPaths } from "@/utils/paths";
import { queryParams } from "@/utils/query-params";

import { Stack } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { type FunctionComponent, useEffect, useState } from "react";

import * as styles from "./LoginForm.styles";
import { ResetPasswordModal, resetPasswordModalVisible } from "../ResetPasswordModal/ResetPasswordModal";

export const LoginForm: FunctionComponent = () =>
{
  const router = useRouter();
  const wasPasswordUpdated = router.query[queryParams.passwordResetSuccess] === "true";
  const redirectTo = router.query[queryParams.redirectedFrom];
  const { invalidateEverything } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const [, setResetPasswordModalOpen] = useAtom(resetPasswordModalVisible);
  const [isLoginInProgress, setIsLoginInProgress] = useState(false);
  const [signInError, setSignInError] = useState<unknown>();
  const lastEnteredPassword = useAuthPageStore(s => s.lastEnteredPassword);
  const lastEnteredEmail = useAuthPageStore(s => s.lastEnteredEmail);
  const { isPending: isResendConfirmationEmailLoading, mutate: resendConfirmationEmail } = useResendConfirmationEmail({
    email: lastEnteredEmail,
    onSuccess: () => setSignInError(null),
    showNotifications: true,
  });
  const form = useForm<LoginFormSchema>({
    initialValues: {
      email: lastEnteredEmail,
      password: lastEnteredPassword,
    },
    validate: zodResolver(loginFormSchema),
    validateInputOnBlur: true,
  });

  useEffect(() =>
  {
    useAuthPageStore.setState({
      lastEnteredEmail: form.values.email,
      lastEnteredPassword: form.values.password,
    });
  }, [form.values.email, form.values.password]);

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
      window.location.replace(`${redirectTo || appPaths.dashboard}`);
    }
    catch (error)
    {
      setSignInError(error);
      setIsLoginInProgress(false);
    }
  });

  return (
    <>
      <ErrorCard
        error={signInError}
        renderAdditionalContent={{
          emailNotConfirmed: (
            <p>
              Du hast keine E-Mail erhalten oder sie ist abgelaufen? Kein Problem! Klicke{" "}
              <button
                type="button"
                disabled={isResendConfirmationEmailLoading}
                css={styles.inlineTextButton}
                onClick={() => resendConfirmationEmail()}>hier
              </button>,{" "}
              um eine neue E-Mail zu erhalten.
            </p>
          )
        }}
      />
      {wasPasswordUpdated && (
        <AlertCard stylesOverwrite={{ marginBottom: "40px" }} variant="success">Dein Passwort wurde erfolgreich geändert. Du kannst dich jetzt mit deinem neuen Passwort
          anmelden.
        </AlertCard>
      )}
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
          <div css={styles.textButtonsWrapper}>
            <CustomLink
              styleType="link-secondary"
              component="button"
              style={{ display: "inline-block" }}
              onClick={openResetPasswordModal}
              stylesOverwrite={{ color: colooors["neutrals-02"][2], textAlign: "left" }}>
              Passwort vergessen?
            </CustomLink>
            <CustomLink
              styleType="link-secondary"
              component={Link}
              href={authPaths.register}
              stylesOverwrite={{ color: colooors["neutrals-02"][2], textAlign: "left" }}>
              Du hast noch kein Konto?
            </CustomLink>
          </div>
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
          href="mailto:gutentag@constellatio.de"
          styleType="link-secondary"
          c="neutrals-01.7">
          gutentag@constellatio.de
        </CustomLink>
      </BodyText>
    </>
  );
};
