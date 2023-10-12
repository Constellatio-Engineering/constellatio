import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Modal } from "@/components/molecules/Modal/Modal";
import ResetPasswordForm from "@/components/resetPasswordForm/ResetPasswordForm";
import { supabase } from "@/lib/supabase";

import { Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { atom, useAtom } from "jotai";
import { type FunctionComponent } from "react";

interface ResetPasswordFormValues 
{
  email: string;
}

export const resetPasswordModalVisible = atom(false);

export const ResetPasswordModal: FunctionComponent = () =>
{
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
      centered>
      <ResetPasswordForm/>
    </Modal>
  );
};
