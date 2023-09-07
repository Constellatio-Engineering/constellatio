import CaseCompleteTestsStep from "@/components/caseCompleteTestsStep/CaseCompleteTestsStep";
import CaseNavBar from "@/components/organisms/caseNavBar/CaseNavBar";
import CaseSolvingHeader from "@/components/organisms/caseSolvingHeader/CaseSolvingHeader";
import { type IGenCase } from "@/services/graphql/__generated/sdk";

import { Title } from "@mantine/core";
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
  const content = fullTextTasks?.json?.content?.filter((contentItem: { content: { text: string }[]; type: string }) => contentItem?.type === "heading");
  const [caseStepIndex, setCaseStepIndex] = React.useState<0 | 1 | 2>(0);
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
      <div css={styles.mainContainer}>
        <CaseNavBar
          variant="case"
          activeStep={caseStepIndex}
          setCaseStepIndex={setCaseStepIndex}
        />
        {caseStepIndex === 0 && <CaseCompleteTestsStep content={content} facts={facts} fullTextTasks={fullTextTasks}/>}
        {/* upon creating the other two steps other index uses will be added here */}
        {/* caseStepIndex === 1  */}
        {/* caseStepIndex === 2  */}
      </div>
      
    </>
  );
};

export default CasePage;
