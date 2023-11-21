import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";

type ShowConfirmChangesDeletionModal = (params: {
  onCancel?: () => void;
  onConfirm?: () => void;
}) => void; 

export const showConfirmChangesDeletionModal: ShowConfirmChangesDeletionModal = ({ onCancel, onConfirm }) =>
{
  modals.openConfirmModal({
    children: (
      <Text size="md">
        Bist du sicher, dass du deine Änderungen verwerfen möchtest?
      </Text>
    ),
    labels: {
      cancel: "Ja, Änderungen verwerfen",
      confirm: "Nein, Änderungen behalten"
    },
    onCancel,
    onConfirm,
    size: "lg",
    title: (
      <Text size="xl">
        Du hast ungespeicherte Änderungen
      </Text>
    ),
    withCloseButton: false,
  });
};
