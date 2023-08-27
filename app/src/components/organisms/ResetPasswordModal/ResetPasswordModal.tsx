import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Modal } from "@/components/molecules/Modal/Modal";

import { Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { atom, useAtom } from "jotai";
import { type FunctionComponent } from "react";

interface ResetPasswordFormValues 
{
  email: string;
}

export const resetPasswordModalVisible = atom(false);

export const ResetPasswordModal: FunctionComponent = () =>
{
  const supabase = createPagesBrowserClient();
  const [isOpen, setOpen] = useAtom(resetPasswordModalVisible);
  const form = useForm<ResetPasswordFormValues>();

  const handleClose = (): void => setOpen(false);

  const handleSubmit = form.onSubmit(async (formValues) =>
  {
    try
    {
      notifications.show({
        message: "The password reset handler was called",
        title: "Password reset handler",
      });
      await supabase.auth.resetPasswordForEmail(formValues.email, {
        redirectTo: "http://localhost:3000/recover",
      });
    }
    catch (error)
    {
      console.log(error);
    }
  });

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      title="Passwort zurücksetzen"
      centered>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Stack spacing="spacing-24">
          <BodyText component="p" styleType="body-01-regular">
            You will receive an email from us with a link. Clicking this link will take you to a page where you can
            enter your new password.
          </BodyText>
          <Input inputType="text" label="E-Mail Adresse" {...form.getInputProps("email")}/>
          <Button<"button"> styleType="primary" type="submit">
            Zurücksetzen
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
