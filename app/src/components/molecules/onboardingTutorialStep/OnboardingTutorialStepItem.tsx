import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { SubtitleText } from "@/components/atoms/SubtitleText/SubtitleText";

import React, { type ReactNode, type FunctionComponent } from "react";

import * as styles from "./OnboardingTutorialStep.styles";

interface OnboardingTutorialStepItemProps
{
  readonly icon: ReactNode;
  readonly itemDescription: string;
  readonly itemTitle: string;
}

const OnboardingTutorialStepItem: FunctionComponent<OnboardingTutorialStepItemProps> = ({ icon, itemDescription, itemTitle }) => 
{
  return (
    <div css={styles.stepItem}>
      {icon && <span css={styles.iconBox}>{icon}</span>}
      <div css={styles.itemContent}>
        {itemTitle && <SubtitleText styleType="subtitle-01-medium">{itemTitle}</SubtitleText>}
        {itemDescription && <BodyText styleType="body-01-regular">{itemDescription}</BodyText>}
      </div>
    </div>
  );
};

export default OnboardingTutorialStepItem;
