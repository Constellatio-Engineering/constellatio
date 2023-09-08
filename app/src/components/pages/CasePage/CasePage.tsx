import CaseCompleteTestsStep from "@/components/organisms/caseCompleteTestsStep/CaseCompleteTestsStep";
import CaseNavBar from "@/components/organisms/caseNavBar/CaseNavBar";
import CaseSolveCaseStep from "@/components/organisms/caseSolveCaseStep/CaseSolveCaseStep";
import CaseSolvingHeader from "@/components/organisms/caseSolvingHeader/CaseSolvingHeader";
import { type IGenCase } from "@/services/graphql/__generated/sdk";

import React, { type FunctionComponent } from "react";

import * as styles from "./CasesPage.styles";

const CasePage: FunctionComponent<IGenCase> = ({
  durationToCompleteInMinutes,
  facts,
  fullTextTasks,
  legalArea,
  tags,
  title,
  topic
}) => 
{
  const [caseStepIndex, setCaseStepIndex] = React.useState<0 | 1 | 2>(1);

  return (
    <>
      <CaseSolvingHeader
        title={title ?? ""}
        variant="case"
        overviewCard={{
          lastUpdated: new Date(),
          legalArea,
          status: "notStarted",
          tags,
          timeInMinutes: durationToCompleteInMinutes || 0,
          topic: topic?.[0]?.topicName ?? "",
          variant: "case",
          views: 0,
        }}
      />
      <CaseNavBar
        variant="case"
        activeStep={caseStepIndex}
        setCaseStepIndex={setCaseStepIndex}
      />
      <div css={styles.mainContainer}>
        {caseStepIndex === 0 && (
          <CaseCompleteTestsStep {...{
            facts,
            fullTextTasks,
          }}
          />
        )}
        {caseStepIndex === 1 && (
          <CaseSolveCaseStep {...{
            facts,
            setCaseStepIndex,
            title
          }}
          />
        )}
        {/* caseStepIndex === 2  */}
      </div>
      
    </>
  );
};

export default CasePage;
