import { Button } from "@/components/atoms/Button/Button";
import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";
import { Check } from "@/components/Icons/Check";

import { useMantineTheme } from "@mantine/core";
import React, { type FunctionComponent, useState } from "react";

import * as styles from "./CaseNavBar.styles";

export interface ICaseNavBarProps
{
  readonly activeStep?: number;
  readonly progressPercentage?: number;
  readonly variant: "case" | "dictionary";
  
}

const CaseNavBar: FunctionComponent<ICaseNavBarProps> = ({ activeStep, progressPercentage, variant }) => 
{
  const theme = useMantineTheme();
  const steps = ["COMPLETE TESTS", "SOLVE CASE", "REVIEW REUSLTS"];
  const [activeStepIndex, setActiveStepIndex] = useState<number>(activeStep ?? 0);
  const [progress, setProgress] = useState<number>(progressPercentage ?? 0);
  
  return variant === "case" ? (
    <div css={styles.wrapper({ theme, variant })}>
      <div css={styles.tabs}>
        {steps.map((step, index) => ( 
          <CaptionText
            component="p"
            key={index}
            onClick={() => setActiveStepIndex(index)}
            css={styles.tab({ active: index === activeStepIndex, completed: index < activeStepIndex, theme })}
            variant="caseNavBar"
            styleType="caption-01-bold">
            <span>{index < activeStepIndex ? <Check/> : index + 1}</span>{step}
            
          </CaptionText>
        ))}
      </div>
      {activeStepIndex < 2 && steps && (
        <div css={styles.callToAction}>
          <Button<"button"> disabled={progress === 0} styleType="primary">{activeStepIndex === 0 ? "Solve this case" : "Submit and view results"}</Button>
        </div>
      )}
      <div css={styles.progressBar({ progress, theme, variant })}/>
    </div>
  ) : (
    <div css={styles.wrapper({ theme, variant })}>
      <div css={styles.progressBar({ progress, theme, variant })}/>
    </div>
  );
};

export default CaseNavBar;
