import { Button } from "@/components/atoms/Button/Button";
import CountLabel from "@/components/atoms/countLabel/CountLabel";
import { SubtitleText } from "@/components/atoms/SubtitleText/SubtitleText";

import { Popover } from "@mantine/core";
import React, { type ReactNode, type FunctionComponent } from "react";

import * as styles from "./OnboardingTutorialStep.styles";

interface OnboardingTutorialStepProps 
{
  readonly children: ReactNode;
  readonly currentStep: number;
  readonly isLastStep?: boolean;
  readonly onNextPressHandler?: () => void;
  readonly stepTitle: string;
  readonly totalSteps: number;
}

const OnboardingTutorialStep: FunctionComponent<OnboardingTutorialStepProps> = ({
  children,
  currentStep,
  isLastStep,
  onNextPressHandler,
  stepTitle,
  totalSteps
}) => 
{
  return (
    <Popover.Dropdown sx={styles.popoverDropdownStyles()}>
      <div css={styles.stepHeader}>
        {stepTitle && (
          <SubtitleText styleType="subtitle-01-bold" c="neutrals-01.0">{stepTitle}</SubtitleText>
        )}
        {totalSteps && currentStep && (
          <span css={styles.countLabel}>
            <CountLabel
              count={currentStep}
              total={totalSteps}
              variant="success"
            />
          </span>
        )}
      </div>
      <div css={styles.stepBody}>
        <div css={styles.itemsContainer}>{children}</div>
        <div css={styles.buttonsWrapper}>
          <Button<"button">
            styleType="primary"
            size="large"
            onClick={onNextPressHandler}
            fullWidth>{isLastStep ? "Tour beenden" : "Weiter"}
          </Button>
        </div>
      </div>
    </Popover.Dropdown>
  );
};

export default OnboardingTutorialStep;
