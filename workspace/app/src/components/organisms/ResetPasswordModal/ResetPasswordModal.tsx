import { Cross } from "@/components/Icons/Cross";
import { Modal } from "@/components/molecules/Modal/Modal";
import ResetPasswordForm from "@/components/molecules/resetPasswordForm/ResetPasswordForm";

import { atom, useAtom } from "jotai";
import { type FunctionComponent, useState } from "react";

import ResetPasswordSuccess from "./resetPasswordSuccess/ResetPasswordSuccess";

export const resetPasswordModalVisible = atom(false);

export type ResetPasswordModalProgress = "form" | "success";

export const ResetPasswordModal: FunctionComponent = () =>
{
  const [isOpen, setOpen] = useAtom(resetPasswordModalVisible);
  const handleClose = (): void => setOpen(false);
  const [progress, setProgress] = useState<ResetPasswordModalProgress>("form");

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      withCloseButton={false}
      centered>
      <span
        onClick={handleClose}
        style={{
          cursor: "pointer", position: "absolute", right: "20px", top: "20px" 
        }}>
        <Cross size={32}/>
      </span>
      {progress === "form" && <ResetPasswordForm setProgress={setProgress}/>}
      {progress === "success" && <ResetPasswordSuccess closeModal={handleClose}/>}
    </Modal>
  );
};
