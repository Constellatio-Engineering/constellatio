import { Button } from "@/components/atoms/Button/Button";
import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import { Input } from "@/components/atoms/Input/Input";
import { colors } from "@/constants/styles/colors";
import { loginFormSchema } from "@/schemas/auth/loginForm.schema";
import { supabase } from "@/supabase/client";
import { api } from "@/utils/api";

import { Stack } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { AuthError } from "@supabase/gotrue-js";
import { useAtom } from "jotai";
import { useRouter } from "next/router"; 
import { type FunctionComponent, useState } from "react";

import { ResetPasswordModal, resetPasswordModalVisible } from "../ResetPasswordModal/ResetPasswordModal";

type SignInError = "emailNotConfirmed" | "invalidCredentials" | "unknownError";

export const LoginForm: FunctionComponent = () =>
{
  const apiContext = api.useContext();
  const [, setResetPasswordModalOpen] = useAtom(resetPasswordModalVisible);
  const router = useRouter();
  const [isLoginInProgress, setIsLoginInProgress] = useState(false);
  const [signInError, setSignInError] = useState<SignInError>();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(loginFormSchema),
    validateInputOnBlur: true,
  });

  const openResetPasswordModal = (): void => setResetPasswordModalOpen(true);

  const handleSubmit = form.onSubmit(async (formValues) =>
  {
    setIsLoginInProgress(true);

    try
    {
      console.log("logging in...");

      const loginResult = await supabase.auth.signInWithPassword({
        email: formValues.email,
        password: formValues.password,
      });

      console.log("login result", loginResult);

      if(loginResult.error)
      {
        throw loginResult.error;
      }

      console.log("successfully logged in. Redirecting to home page...");

      await apiContext.invalidate();
      await router.replace("/");
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
      {signInError && (
        <div style={{ backgroundColor: "rgba(255,0,77,0.24)", marginBottom: 40, padding: 30 }}>
          <p>
            {signInError === "emailNotConfirmed" && "Du musst zuerst deine E-Mail Adresse bestätigen. Eine Bestätigungsmail wurde dir zugesendet."}
            {signInError === "invalidCredentials" && "Wir konnten keinen Account mit diesen Anmeldedaten finden. Bitte überprüfe deine Eingaben."}
            {signInError === "unknownError" && "Es ist ein unbekannter Fehler aufgetreten. Bitte versuche es erneut."}
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <Stack spacing="spacing-24">
          <Stack spacing="spacing-12">
            <Input
              inputType="text"
              label="Email"
              title="Email"
              {...form.getInputProps("email")}
            />
            <Input
              inputType="password"
              label="Password"
              title="password"
              {...form.getInputProps("password")}
            />
          </Stack>
          <CustomLink
            styleType="link-secondary"
            component="button"
            onClick={openResetPasswordModal}
            stylesOverwrite={{ color: colors["neutrals-02"][2], textAlign: "left" }}>
            Forgot Password?
          </CustomLink>
          <Button<"button">
            styleType="primary"
            type="submit"
            title="Log in"
            loading={isLoginInProgress}>
            Log in
          </Button>
        </Stack>
      </form>
      <ResetPasswordModal/>
    </>
  );
};
