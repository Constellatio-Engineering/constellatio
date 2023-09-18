import CaseCompleteTestsStep from "@/components/organisms/caseCompleteTestsStep/CaseCompleteTestsStep";
import CaseNavBar from "@/components/organisms/caseNavBar/CaseNavBar";
import CaseResultsReviewStep from "@/components/organisms/caseResultsReviewStep/CaseResultsReviewStep";
import CaseSolveCaseStep from "@/components/organisms/caseSolveCaseStep/CaseSolveCaseStep";
import CaseSolvingHeader from "@/components/organisms/caseSolvingHeader/CaseSolvingHeader";
import { type IGenCase } from "@/services/graphql/__generated/sdk";

import React, { type FunctionComponent } from "react";

import * as styles from "./CasesPage.styles";

const DetailsPage: FunctionComponent<IGenCase& {readonly variant: "case" | "dictionary"}> = ({
  durationToCompleteInMinutes,
  facts,
  fullTextTasks,
  id,
  legalArea,
  resolution,
  tags,
  title,
  topic,
  variant
}) => 
{
  const [caseStepIndex, setCaseStepIndex] = React.useState<0 | 1 | 2>(0);

  return (
    <>
      <CaseSolvingHeader
        title={title ?? ""}
        variant={variant}
        pathSlugs={[{ path: variant === "case" ? "/cases" : "/dictionaries", slug: variant === "case" ? "Cases" : "Dictionaries" }, { path: `/dictionaries/${id}`, slug: title ?? "" }]}
        overviewCard={{
          lastUpdated: new Date(),
          legalArea,
          status: "notStarted",
          tags,
          timeInMinutes: durationToCompleteInMinutes || 0,
          topic: topic?.[0]?.topicName ?? "",
          variant,
          views: 0,

        }}
      />
      <CaseNavBar
        variant={variant}
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
        {facts && resolution && title && caseStepIndex === 2 && (
          <CaseResultsReviewStep {...{
            facts, resolution, setCaseStepIndex, title 
          }}
          />
        )}
      </div>
    </>
  );
};

export default DetailsPage;
