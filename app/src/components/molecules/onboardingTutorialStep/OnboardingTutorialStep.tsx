import { Button } from "@/components/atoms/Button/Button";
import CountLabel from "@/components/atoms/countLabel/CountLabel";
import { SubtitleText } from "@/components/atoms/SubtitleText/SubtitleText";

import React, { type ReactNode, type FunctionComponent } from "react";

import * as styles from "./OnboardingTutorialStep.styles";

interface OnboardingTutorialStepProps 
{
  readonly children: ReactNode;
  readonly currentStep: number;
  readonly onNextPressHandler?: () => void;
  readonly onSkipPressHandler?: () => void;
  readonly stepTitle: string;
  readonly totalSteps: number;
}

const OnboardingTutorialStep: FunctionComponent<
OnboardingTutorialStepProps
> = ({
  children,
  currentStep,
  onNextPressHandler,
  onSkipPressHandler,
  stepTitle,
  totalSteps
}) => 
{
  return (
    <div css={styles.wrapper}>
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
            styleType="secondarySimple"
            size="large"
            onClick={onSkipPressHandler}
            fullWidth>Take Tour Later
          </Button>
          <Button<"button">
            styleType="primary"
            size="large"
            onClick={onNextPressHandler}
            fullWidth>Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTutorialStep;
