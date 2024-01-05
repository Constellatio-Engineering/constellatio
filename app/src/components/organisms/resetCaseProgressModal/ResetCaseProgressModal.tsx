import { Button } from "@/components/atoms/Button/Button";
import { Modal } from "@/components/molecules/Modal/Modal";
import useResetCaseProgress from "@/hooks/useResetCaseProgress";
import { type Nullable } from "@/utils/types";

import { Group, Text } from "@mantine/core";
import React, { type FunctionComponent } from "react";

type Props = {
  readonly caseId: string;
  readonly caseTitle: Nullable<string>;
  readonly isOpened: boolean;
  readonly onClose: () => void;
};

const ResetCaseProgressModal: FunctionComponent<Props> = ({
  caseId,
  caseTitle,
  isOpened,
  onClose
}) =>
{
  const resetCaseProgress = useResetCaseProgress();

  return (
    <Modal
      lockScroll={false}
      opened={isOpened}
      centered
      title="Fallfortschritt zurücksetzen?"
      onClose={onClose}>
      <Text>
        Bist du dir sicher, dass du deine Antworten in der geführten Lösung und dein Gutachten zu&nbsp;<strong>{caseTitle}</strong>&nbsp;löschen willst?
      </Text>
      <Group noWrap grow w="100%">
        <Button<"button"> onClick={onClose} fullWidth styleType="secondarySimple">
          Nein, behalten
        </Button>
        <Button<"button">
          onClick={() =>
          {
            resetCaseProgress({ caseId });
            onClose();
          }}
          styleType="primary"
          fullWidth>
          Ja, zurücksetzen
        </Button>
      </Group>
    </Modal>
  );
};

export default ResetCaseProgressModal;
