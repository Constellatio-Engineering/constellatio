import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";
import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import { Check } from "@/components/Icons/Check";
import useCaseSolvingStore, { type CaseStepIndex } from "@/stores/caseSolving.store";

import { getCaseProgressStateAsNumber } from "@constellatio/cms/utils/case";
import { type CaseProgressState } from "@constellatio/shared/validation";
import { type FunctionComponent } from "react";

import * as styles from "./CaseNavBar.styles";

export interface ICaseNavBarProps
{
  readonly caseProgressState: CaseProgressState;
  readonly caseStepIndex: CaseStepIndex;
  readonly variant: "case" | "dictionary";
}

const CaseNavBar: FunctionComponent<ICaseNavBarProps> = ({ caseProgressState, caseStepIndex, variant }) =>
{
  const steps = ["Fall bearbeiten", "Lösung abgeben", "Musterlösung"];
  const overrideCaseStepIndex = useCaseSolvingStore(s => s.overrideCaseStepIndex);

  const onStepClick = (index: number): void =>
  {
    overrideCaseStepIndex(index as CaseStepIndex, caseProgressState);
  };

  // TODO: utilize progress bar
  return variant === "case" ? (
    <div css={styles.componentArea()}>
      <ContentWrapper>
        <div css={styles.wrapper({ variant })}>
          <div css={styles.tabs}>
            {steps.map((stepText, index) =>
            {
              if(caseStepIndex == null || index > steps.length - 1)
              {
                return null;
              }

              const isClickable = index <= getCaseProgressStateAsNumber(caseProgressState);

              return (
                <CaptionText
                  tt="uppercase"
                  component="p"
                  key={index}
                  onClick={isClickable ? () => onStepClick(index) : undefined}
                  css={styles.tab({
                    active: index === caseStepIndex,
                    completed: index < caseStepIndex,
                    isClickable,
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
      </ContentWrapper>
    </div>
  ) : (
    <div css={styles.componentArea()}>
      <ContentWrapper>
        <div css={styles.wrapper({ variant })}>
          {caseProgressState === "completing-tests" && <div css={styles.progressBar({ progress: 0, variant })}/>}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default CaseNavBar;
