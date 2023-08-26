import { Modal as MantineModal, type ModalProps as MantineModalProps } from "@mantine/core";
import React, { type FC } from "react";

import { modalStyles } from "./Modal.styles";

export type ModalProps = MantineModalProps;

export const Modal: FC<ModalProps> = ({
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
