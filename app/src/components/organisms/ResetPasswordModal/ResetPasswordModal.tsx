
import { Modal } from "@/components/molecules/Modal/Modal";
import ResetPasswordForm from "@/components/resetPasswordForm/ResetPasswordForm";

import { atom, useAtom } from "jotai";
import { type FunctionComponent } from "react";

export const resetPasswordModalVisible = atom(false);

export const ResetPasswordModal: FunctionComponent = () =>
{
  const [isOpen, setOpen] = useAtom(resetPasswordModalVisible);
  const handleClose = (): void => setOpen(false);

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      centered>
      <ResetPasswordForm/>
    </Modal>
  );
};
