import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { AlertCard } from "@/components/atoms/Card/AlertCard";
import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import { Input } from "@/components/atoms/Input/Input";
import ErrorCard from "@/components/molecules/errorCard/ErrorCard";
import { colors } from "@/constants/styles/colors";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { supabase } from "@/lib/supabase";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { loginFormSchema, type LoginFormSchema } from "@/schemas/auth/loginForm.schema";
import useAuthPageStore from "@/stores/authPage.store";
import { paths } from "@/utils/paths";
import { queryParams } from "@/utils/query-params";

import { Stack } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router"; 
import { type FunctionComponent, useEffect, useState } from "react";

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
      await router.replace(`${redirectTo || paths.dashboard}`);
    }
    catch (error)
    {
      setSignInError(error);
    }
    finally
    {
      setIsLoginInProgress(false);
    }
  });

  return (
    <>
      <ErrorCard error={signInError}/>
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
