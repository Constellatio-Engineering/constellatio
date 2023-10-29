import React, { type FunctionComponent } from "react";

import * as styles from "./DeleteBookmarkModal.styles";
import { Modal } from "../molecules/Modal/Modal";
import { Title } from "@mantine/core";
import { Button } from "../atoms/Button/Button";

interface DeleteBookmarkModalProps
{
  onClose: () => void;
  opened: boolean;
  onSubmit: () => void;
}

const DeleteBookmarkModal: FunctionComponent<DeleteBookmarkModalProps> = ({ onClose, opened,onSubmit }) => {
  return (
    <Modal
    opened={opened}
    centered
    lockScroll={false}
    withCloseButton={false}
    onClose={onClose}>
    <Title order={3}>Aus den Favoriten entfernen?</Title>
    <div className="buttons">
      <Button<"button">
        type="button"
        size="large"
        style={{ marginRight: "12px" }}
        styleType="secondarySimple"
        onClick={onClose}>
        Nein, behalten
      </Button>
      <Button<"button">
        type="button"
        size="large"
        styleType="primary"
        onClick={onSubmit}>
        Ja, entfernen
      </Button>
    </div>
  </Modal>
  );
};

export default DeleteBookmarkModal;
