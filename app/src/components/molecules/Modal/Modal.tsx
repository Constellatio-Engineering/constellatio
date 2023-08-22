import { Modal as MantineModal, type ModalProps } from "@mantine/core";
import React, { type FC } from "react";

import { modalStyles } from "./Modal.styles";

type TModal = ModalProps;

export const Modal: FC<TModal> = ({
  children,
  onClose,
  opened,
  ...props
}) => 
{
  return (
    <MantineModal
      opened={opened}
      onClose={onClose}
      size="520px"
      styles={modalStyles()}
      {...props}>
      {children}
    </MantineModal>
  );
};
