import { Button } from "@/components/atoms/Button/Button";
import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import { Input } from "@/components/atoms/Input/Input";
import { colors } from "@/constants/styles/colors";
import { type Database } from "@/lib/database.types";
import { loginFormSchema } from "@/schemas/LoginFormSchema";

import { Stack } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useAtom } from "jotai";
import { useRouter } from "next/router"; 
import { type FunctionComponent, useState } from "react";

import { ResetPasswordModal, resetPasswordModalVisible } from "../ResetPasswordModal/ResetPasswordModal";

export const LoginForm: FunctionComponent = () =>
{
  const [_, setResetPasswordModalOpen] = useAtom(resetPasswordModalVisible);
  const supabase = createPagesBrowserClient<Database>();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
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
    try
    {
      setSubmitting(true);

      notifications.show({
        message: "The login handler was called",
        title: "Login handler",
      });

      const result = await supabase.auth.signInWithPassword({
        email: formValues.email,
        password: formValues.password,
      });

      if(result.error)
      {
        throw result.error;
      }

      console.log("successfully logged in, redirecting to home page");

      await router.replace("/");
    }
    catch (error)
    {
      console.log("error while logging in", error);
    }
    finally
    {
      setSubmitting(false);
    }
  });

  return (
    <>
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
          <Button
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            /* @ts-ignore */ // there is a bug with typescript, so we need to ignore this
            styleType="primary"
            type="submit"
            title="Log in"
            loading={submitting}>
            Log in
          </Button>
        </Stack>
      </form>
      <ResetPasswordModal/>
    </>
  );
};
