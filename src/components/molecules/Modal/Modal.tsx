import React, { FC } from "react";
import { Modal as MantineModal, ModalProps } from "@mantine/core";
import { modalStyles } from "./Modal.styles";

type TModal = ModalProps & {
};

export const Modal: FC<TModal> = ({ opened, onClose, children, ...props }) => {
  return (
    <MantineModal opened={opened} onClose={onClose} styles={modalStyles()} {...props}>
      {children}
    </MantineModal>
  );
};
