import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { env } from "@/env.mjs";
import useSetOnboardingResult from "@/hooks/useSetOnboardingResult";
import { type SearchStoreProps } from "@/stores/onboarding.store";
import { appPaths } from "@/utils/paths";

import { Modal, Title } from "@mantine/core";
import { useRouter } from "next/router";
import {
  type FunctionComponent, useEffect, useRef
} from "react";

import * as styles from "./OnboardingModal.styles";

type Props = {
  readonly onboardingStepsIndex: number;
  readonly setOnboardingStepsIndex: SearchStoreProps["setOnboardingStepsIndex"];
};

const OnboardingModal: FunctionComponent<Props> = ({ onboardingStepsIndex, setOnboardingStepsIndex }) =>
{
  const router = useRouter();
  const { setOnboardingResult } = useSetOnboardingResult();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const onClose = async (redirectTo?: string): Promise<void> =>
  {
    await setOnboardingResult({ result: "completed" });

    timeoutRef.current = setTimeout(() =>
    {
      if(redirectTo)
      {
        void router.push(redirectTo);
      }
    }, 200);

    setOnboardingStepsIndex(-1);
  };

  useEffect(() =>
  {
    return () =>
    {
      if(timeoutRef.current)
      {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Modal
      opened={onboardingStepsIndex === 4}
      centered
      onClose={onClose}
      size="lg"
      padding="50px 20px 20px"
      closeOnClickOutside={env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT === "development"}
      closeOnEscape={false}
      withCloseButton={false}>
      <div css={styles.contentWrapper}>
        <Title order={2} ta="center">Aktiv lernen mit Fällen</Title>
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
            onClick={async () => onClose(appPaths.cases)}>
            Fall-Übersicht ansehen
          </Button>
          <Button<"button">
            size="large"
            miw="100%"
            styleType="primary"
            onClick={async () => onClose(`${appPaths.cases}/0fcdcecc-c9d4-4326-b12f-55488717c083?id=0fcdcecc-c9d4-4326-b12f-55488717c083`)}>
            Einführungs-Fall starten
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default OnboardingModal;
