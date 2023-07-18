import { useForm, zodResolver } from "@mantine/form";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../lib/database.types";
import { notifications } from "@mantine/notifications";
import { Stack } from "@mantine/core";
import { ResetPasswordModal, resetPasswordModalVisible } from "../ResetPasswordModal/ResetPasswordModal";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useState } from "react";
import { loginFormSchema } from "../../../schemas/LoginFormSchema";
import { Input } from "@/components/atoms/Input/Input";
import { CustomLink } from "@/components/atoms/Link/CustomLink";
import { Button } from "@/components/atoms/Button/Button";

export function LoginForm() {
  const [_, setResetPasswordModalOpen] = useAtom(resetPasswordModalVisible);
  const supabase = createPagesBrowserClient<Database>();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const form = useForm({
    validate: zodResolver(loginFormSchema),
    validateInputOnBlur: true,
    initialValues: {
      email: "",
      password: "",
    },
  });

  const openResetPasswordModal = () => setResetPasswordModalOpen(true);

  const handleSubmit = form.onSubmit(async (formValues) => {
    try {
      setSubmitting(true);

      notifications.show({
        title: "Login handler",
        message: "The login handler was called",
      });

      await supabase.auth.signInWithPassword({
        email: formValues.email,
        password: formValues.password,
      });

      await router.replace("/");
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={"spacing-24"}>
          <Stack spacing={"spacing-12"}>
            <Input inputType="text" label="Email" title="Email" {...form.getInputProps("email")} />
            <Input inputType="password" label="Password" title="password" {...form.getInputProps("password")} />
          </Stack>
          <CustomLink
            styleType="primary-01"
            component="button"
            onClick={openResetPasswordModal}
            stylesOverwrite={{ textAlign: "left" }}
          >
            Forgot Password?
          </CustomLink>
          <Button styleType="primary" type="submit" title={"Log in"} loading={submitting}>
            Log in
          </Button>
        </Stack>
      </form>
      <ResetPasswordModal />
    </>
  );
}
