import { Modal as MantineModal, type ModalProps as MantineModalProps } from "@mantine/core";
import { useMantineTheme } from "@mantine/styles";
import { type FC } from "react";

import { modalStyles } from "./Modal.styles";

export type ModalProps = MantineModalProps;

export const Modal: FC<ModalProps> = ({
  children,
  onClose,
  opened,
  ...props
}) => 
{
  const theme = useMantineTheme();

  return (
    <MantineModal
      opened={opened}
      onClose={onClose}
      size="520px"
      styles={modalStyles(theme)}
      {...props}>
      {children}
    </MantineModal>
  );
};
