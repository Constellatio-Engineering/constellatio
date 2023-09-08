import { Button } from "@/components/atoms/Button/Button";
import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";
import { Check } from "@/components/Icons/Check";
import useCaseSolvingStore from "@/stores/caseSolving.store";

import { useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { type FunctionComponent, useState, useEffect } from "react";

import * as styles from "./CaseNavBar.styles";
import { calculateScrollProgress } from "./caseNavbarHelper";

export interface ICaseNavBarProps 
{
  readonly activeStep?: 0 | 1 | 2;
  readonly setCaseStepIndex?: React.Dispatch<React.SetStateAction<0 | 1 | 2>>;
  readonly variant: "case" | "dictionary";
}

const CaseNavBar: FunctionComponent<ICaseNavBarProps> = ({ activeStep, setCaseStepIndex, variant }) => 
{
  const theme = useMantineTheme();
  const steps = ["COMPLETE TESTS", "SOLVE CASE", "REVIEW REUSLTS"];
  const [progress, setProgress] = useState<number>(0);
  const { hasCaseSolvingStarted, isStepCompleted, setShowStepTwoModal } = useCaseSolvingStore();

  useEffect(() => 
  {
    const handleScroll = (): void => 
    {
      if(activeStep === 0) { setProgress(calculateScrollProgress("completeTestsStepContent")); }
      if(activeStep === 1) { setProgress(calculateScrollProgress("solveCaseStepContent")); }
    };
    if(hasCaseSolvingStarted)
    {
      window.addEventListener("scroll", () => setTimeout(() => handleScroll(), 500)); 
    }
    return () => window.removeEventListener("scroll", () => setTimeout(() => handleScroll(), 0));
  }, [activeStep, hasCaseSolvingStarted]);

  const handleCallToAction = (): void => 
  {
    console.log({
      currentStep: activeStep,
      hasCaseSolvingStarted,
      isStepCompleted
    });
    
    if(setCaseStepIndex)
    {
      if(activeStep === 0) { setCaseStepIndex(1); }
      if(activeStep === 1) { setShowStepTwoModal(true); }  
    }
  };

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
                  onClick={() => 
                  {
                    console.log({ activeStep, index });
                    
                    if(activeStep > 0 && activeStep > index) { setCaseStepIndex(index); }
                  }}
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
          <Button<"button"> onClick={handleCallToAction} disabled={!isStepCompleted} styleType="primary">
            {activeStep === 0 ? "Solve this case" : "Submit and view results"}
          </Button>
        </div>
      )}
      {hasCaseSolvingStarted && <div css={styles.progressBar({ progress, theme, variant })}/>}
    </div>
  ) : (
    <div css={styles.wrapper({ theme, variant })}>
      {hasCaseSolvingStarted && <div css={styles.progressBar({ progress, theme, variant })}/>}
    </div>
  );
};

export default CaseNavBar;
