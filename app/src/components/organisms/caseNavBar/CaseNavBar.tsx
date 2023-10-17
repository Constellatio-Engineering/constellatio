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
  readonly variant: "case" | "dictionary";
}

const CaseNavBar: FunctionComponent<ICaseNavBarProps> = ({ variant }) => 
{
  const theme = useMantineTheme();
  const steps = ["COMPLETE TESTS", "SOLVE CASE", "REVIEW REUSLTS"];

  const handleCallToAction = (): void => 
  {
    if(setCaseStepIndex)
    {
      if(caseStepIndex === 0) { setCaseStepIndex(1); }
      if(caseStepIndex === 1) { setShowStepTwoModal(true); }  
    }
  };

  // TODO: utilize progress bar
  return variant === "case" ? (
    <div css={styles.componentArea({ theme, variant })}>
      <div css={styles.wrapper({ variant })}>
        <div css={styles.tabs}>
          {setCaseStepIndex &&
            steps.map(
              (stepText, index) =>
                (index === 0 || index === 1 || index === 2) &&
                caseStepIndex !== undefined && (
                  <CaptionText
                    component="p"
                    key={index}
                    onClick={() =>
                    {
                      if(caseStepIndex > 0 && caseStepIndex > index) { setCaseStepIndex(index); }
                    }}
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
                )
            )}
        </div>
        {caseStepIndex !== undefined && caseStepIndex < 2 && steps && (
          <div css={styles.callToAction}>
            <Button<"button"> onClick={handleCallToAction} disabled={caseStepIndex === 0 ? !isLastGame : !isStepCompleted} styleType="primary">
              {caseStepIndex === 0 ? "Solve this case" : "Submit and view results"}
            </Button>
          </div>
        )}
      </div>
      {hasCaseSolvingStarted && <div css={styles.progressBar({ progress: 0, theme, variant })}/>}
    </div>
  ) : (
    <div css={styles.componentArea({ theme, variant })}>
      <div css={styles.wrapper({ variant })}>
        {hasCaseSolvingStarted && <div css={styles.progressBar({ progress: 0, theme, variant })}/>}
      </div>
    </div>
  );
};

export default CaseNavBar;
