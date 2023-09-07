import { Button } from "@/components/atoms/Button/Button";
import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";
import { Check } from "@/components/Icons/Check";
import useCaseSolvingStore from "@/stores/caseSolving.store";

import { useMantineTheme } from "@mantine/core";
import React, { type FunctionComponent, useState, useEffect } from "react";

import * as styles from "./CaseNavBar.styles";
import { calculateScrollProgress } from "./caseNavbarHelper";

export interface ICaseNavBarProps 
{
  readonly activeStep?: number;
  readonly progressPercentage?: number;
  readonly setCaseStepIndex?: React.Dispatch<React.SetStateAction<0 | 1 | 2>>;
  readonly variant: "case" | "dictionary";
}

const CaseNavBar: FunctionComponent<ICaseNavBarProps> = ({
  activeStep,
  progressPercentage,
  setCaseStepIndex,
  variant,
}) => 
{
  const theme = useMantineTheme();
  const steps = ["COMPLETE TESTS", "SOLVE CASE", "REVIEW REUSLTS"];
  const [progress, setProgress] = useState<number>(progressPercentage ?? 0);
  const { hasCaseSolvingStarted } = useCaseSolvingStore();

  useEffect(() => 
  {
    if(progressPercentage) 
    {
      setProgress(progressPercentage);
    }
  }, [progressPercentage]);

  useEffect(() => 
  {
    const handleScroll = (): void => 
    {
      const progress = calculateScrollProgress();
      setProgress(progress);
    };

    if(hasCaseSolvingStarted) 
    {
      window.addEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasCaseSolvingStarted]);

  return variant === "case" ? (
    <div css={styles.wrapper({ theme, variant })}>
      <div css={styles.tabs}>
        {setCaseStepIndex &&
          steps.map(
            (stepText, index) =>
              (index === 0 || index === 1 || index === 2) &&
              activeStep !== undefined && (
                <CaptionText
                  component="p"
                  key={index}
                  // onClick={() => setCaseStepIndex(index)}
                  css={styles.tab({
                    active: index === activeStep,
                    completed: index < activeStep,
                    theme,
                  })}
                  variant="caseNavBar"
                  styleType="caption-01-bold">
                  <span>{index < activeStep ? <Check/> : index + 1}</span>
                  {stepText}
                </CaptionText>
              )
          )}
      </div>
      {activeStep !== undefined && activeStep < 2 && steps && (
        <div css={styles.callToAction}>
          <Button<"button"> disabled={progress === 0} styleType="primary">
            {activeStep === 0 ? "Solve this case" : "Submit and view results"}
          </Button>
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
