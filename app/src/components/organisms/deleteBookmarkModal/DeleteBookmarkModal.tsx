import { Button } from "@/components/atoms/Button/Button";
import { Modal } from "@/components/molecules/Modal/Modal";

import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

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
          onClick={(e) =>
          {
            e.stopPropagation();
            onClose();
          }}>
          Nein, behalten
        </Button>
        <Button<"button">
          type="button"
          size="large"
          styleType="primary"
          onClick={(e) =>
          {
            e.stopPropagation();
            onSubmit();
          }}>
          Ja, entfernen
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteBookmarkModal;
