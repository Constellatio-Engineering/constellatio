import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";
import { Check } from "@/components/Icons/Check";
import { type CaseProgressState } from "@/db/schema";
import useCaseSolvingStore, { type CaseStepIndex } from "@/stores/caseSolving.store";

import { useMantineTheme } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./CaseNavBar.styles";

export interface ICaseNavBarProps 
{
  readonly caseProgressState: CaseProgressState;
  readonly caseStepIndex: CaseStepIndex;
  readonly variant: "case" | "dictionary";
}

const CaseNavBar: FunctionComponent<ICaseNavBarProps> = ({ caseProgressState, caseStepIndex, variant }) =>
{
  const theme = useMantineTheme();
  const steps = ["COMPLETE TESTS", "SOLVE CASE", "REVIEW RESULTS"];
  const overrideCaseStepIndex = useCaseSolvingStore(s => s.overrideCaseStepIndex);

  const onStepClick = (index: number): void =>
  {
    overrideCaseStepIndex(index as CaseStepIndex, caseProgressState);
  };

  // TODO: utilize progress bar
  return variant === "case" ? (
    <div css={styles.componentArea({ theme, variant })}>
      <div css={styles.wrapper({ variant })}>
        <div css={styles.tabs}>
          {steps.map((stepText, index) =>
          {
            if(caseStepIndex == null || index > steps.length - 1)
            {
              return null;
            }

            return (
              <CaptionText
                component="p"
                key={index}
                onClick={() => onStepClick(index)}
                css={styles.tab({
                  active: index === caseStepIndex,
                  completed: index < caseStepIndex,
                  theme,
                })}
                variant="caseNavBar"
                styleType="caption-01-bold">
                <span>{index < caseStepIndex ? <Check/> : index + 1}</span>
                {stepText}
              </CaptionText>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <div css={styles.componentArea({ theme, variant })}>
      <div css={styles.wrapper({ variant })}>
        {caseProgressState === "completing-tests" && <div css={styles.progressBar({ progress: 0, theme, variant })}/>}
      </div>
    </div>
  );
};

export default CaseNavBar;
