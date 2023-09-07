import { Button } from "@/components/atoms/Button/Button";
import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";
import { Check } from "@/components/Icons/Check";

import { useMantineTheme } from "@mantine/core";
// import { IconCheck } from "@tabler/icons-react";
import React, { type FunctionComponent, useState } from "react";

import * as styles from "./CaseNavBar.styles";

export interface ICaseNavBarProps
{
  readonly title: string;
}

const CaseNavBar: FunctionComponent<ICaseNavBarProps> = ({ title }) => 
{
  const theme = useMantineTheme();
  const [steps, setSteps] = useState<string[]>(["COMPLETE TESTS", "SOLVE CASE", "REVIEW REUSLTS"]);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  return (
    <div css={styles.wrapper}>
      <div css={styles.tabs}>
        {steps.map((step, index) => ( 
          <CaptionText
            component="p"
            key={index}
            css={styles.tab({ active: index === activeStepIndex, completed: index < activeStepIndex, theme })}
            variant="caseNavBar"
            styleType="caption-01-bold">
            <span>{index < activeStepIndex ? <Check/> : index + 1}</span>{step}
            
          </CaptionText>
        ))}
      </div>
      {title && (
        <div css={styles.callToAction}>
          <Button styleType="primary">Solve this case</Button>
        </div>
      )}
    </div>
  );
};

export default CaseNavBar;
