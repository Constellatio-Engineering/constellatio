import { atom, useAtom } from "jotai";
import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

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
    <Modal opened={isOpen} onClose={handleClose} title="Passwort zurücksetzen">
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput label="E-Mail Adresse" {...form.getInputProps("email")} />
          <Button type="submit" radius="xl">
            Zurücksetzen
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
