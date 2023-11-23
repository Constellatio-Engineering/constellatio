import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import useSetOnboardingResult from "@/hooks/useSetOnboardingResult";
import { paths } from "@/utils/paths";

import { Modal, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { type Dispatch, type FunctionComponent, type SetStateAction } from "react";

import * as styles from "./OnboardingModal.styles";

type Props = {
  readonly onboardingStepsIndex: number;
  readonly setOnboardingStepsIndex: Dispatch<SetStateAction<number>>;
};

const OnboardingModal: FunctionComponent<Props> = ({ onboardingStepsIndex, setOnboardingStepsIndex }) =>
{
  const router = useRouter();
  const { setOnboardingResult } = useSetOnboardingResult();

  const onClose = (redirectTo?: string): void =>
  {
    setOnboardingResult({ result: "completed" });
    setOnboardingStepsIndex(-1);

    if(redirectTo)
    {
      void router.push(redirectTo);
    }
  };

  return (
    <Modal
      opened={onboardingStepsIndex === 3}
      centered
      onClose={onClose}
      closeOnClickOutside
      size="lg"
      padding={20}
      closeOnEscape
      withCloseButton>
      <div css={styles.contentWrapper}>
        <Title order={2} ta="center">Willkommen bei Constellatio!</Title>
        <BodyText
          ta="center"
          styleType="body-01-regular"
          style={{ fontSize: 18 }}
          component="p">
          Bei Constellatio lernst du aktiv anhand von Fällen. Schnapp dir dein Gesetzbuch, setz dich mit deinem Laptop/ Tablet an den Schreibtisch und los geht&apos;s!
        </BodyText>
        <div css={styles.buttonsWrapper}>
          <Button<"button">
            size="large"
            miw="100%"
            styleType="secondarySimple"
            onClick={() => onClose()}>
            Schließen
          </Button>
          <Button<"button">
            size="large"
            miw="100%"
            styleType="primary"
            onClick={() => onClose(paths.cases)}>
            Fall-Übersicht ansehen
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default OnboardingModal;
