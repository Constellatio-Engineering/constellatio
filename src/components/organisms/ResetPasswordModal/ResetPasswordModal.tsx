import { atom, useAtom } from "jotai";

import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { Modal } from "@/components/molecules/Modal/Modal";
import { Stack, Text, Title } from "@mantine/core";
import { Input } from "@/components/atoms/Input/Input";
import { Button } from "@/components/atoms/Button/Button";
import { BodyText } from "@/components/atoms/BodyText/BodyText";

type ResetPasswordFormValues = {
  email: string;
};

export const resetPasswordModalVisible = atom(false);

export function ResetPasswordModal() {
  const supabase = createPagesBrowserClient();
  const [isOpen, setOpen] = useAtom(resetPasswordModalVisible);
  const form = useForm<ResetPasswordFormValues>();

  const handleClose = () => setOpen(false);

  const handleSubmit = form.onSubmit(async (formValues) => {
    try {
      notifications.show({
        title: "Password reset handler",
        message: "The password reset handler was called",
      });
      await supabase.auth.resetPasswordForEmail(formValues.email, {
        redirectTo: "http://localhost:3000/recover",
      });
    } catch (error) {}
  });

  return (
    <Modal opened={isOpen} onClose={handleClose} title={"Passwort zurücksetzen"} centered>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Stack spacing={"spacing-24"}>
          <BodyText styleType="body-01-regular">
            You will receive an email from us with a link. Clicking this link will take you to a page where you can
            enter your new password.
          </BodyText>
          <Input inputType="text" label="E-Mail Adresse" {...form.getInputProps("email")} />
          <Button styleType="primary" type="submit">
            Zurücksetzen
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
