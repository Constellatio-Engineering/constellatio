import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import { Button } from "../atoms/Button/Button";
import { Modal } from "../molecules/Modal/Modal";

interface DeleteBookmarkModalProps
{
  readonly onClose: () => void;
  readonly onSubmit: () => void;
  readonly opened: boolean;
}

const DeleteBookmarkModal: FunctionComponent<DeleteBookmarkModalProps> = ({ onClose, onSubmit, opened }) => 
{
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
