import CaseCompleteTestsStep from "@/components/organisms/caseCompleteTestsStep/CaseCompleteTestsStep";
import CaseNavBar from "@/components/organisms/caseNavBar/CaseNavBar";
import CaseResultsReviewStep from "@/components/organisms/caseResultsReviewStep/CaseResultsReviewStep";
import CaseSolveCaseStep from "@/components/organisms/caseSolveCaseStep/CaseSolveCaseStep";
import CaseSolvingHeader from "@/components/organisms/caseSolvingHeader/CaseSolvingHeader";
import { type IGenArticle, type IGenCase } from "@/services/graphql/__generated/sdk";
import useCaseSolvingStore from "@/stores/caseSolving.store";

import React, { useEffect, type FunctionComponent } from "react";

import * as styles from "./DetailsPage.styles";

// Omit<Omit<Partial<IGenCase & IGenArticle>, "__typename">, "variant"> & {readonly variant: "case" | "dictionary"};

type IDetailsPageProps = {
  readonly content: IGenCase | IGenArticle | undefined;
  readonly variant: "case" | "dictionary";
};

const DetailsPage: FunctionComponent<IDetailsPageProps> = ({ content, variant }) => 
{
  const [caseStepIndex, setCaseStepIndex] = React.useState<0 | 1 | 2>(2);
  const { setHasCaseSolvingStarted } = useCaseSolvingStore();

  useEffect(() => 
  {
    if(content?.__typename === "Article")
    {
      setCaseStepIndex(0);
      setHasCaseSolvingStarted(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.__typename]);

  return (
    <>
      <CaseSolvingHeader
        title={content?.title ?? ""}
        variant={variant}
        pathSlugs={[{ path: variant === "case" ? "/cases" : "/dictionary", slug: variant === "case" ? "Cases" : "Dictionary" }, { path: `/dictionaries/${content?.id}`, slug: content?.title ?? "" }]}
        overviewCard={{
          lastUpdated: new Date(),
          legalArea: content?.legalArea,
          status: "notStarted",
          tags: content?.tags,
          timeInMinutes: content?.__typename === "Case" && content.durationToCompleteInMinutes ? content.durationToCompleteInMinutes : undefined,
          topic: content?.topic?.[0]?.topicName ?? "",
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
        {content?.fullTextTasks && caseStepIndex === 0 && (
          <CaseCompleteTestsStep {...{
            facts: content?.__typename === "Case" ? content?.facts : undefined,
            fullTextTasks: content?.fullTextTasks,
            variant
          }}
          />
        )}
        {content?.__typename === "Case" && caseStepIndex === 1 && (
          <CaseSolveCaseStep {...{
            facts: content?.facts,
            setCaseStepIndex,
            title: content?.title
          }}
          />
        )}
        {content?.__typename === "Case" && content?.facts && content?.resolution && content?.title && caseStepIndex === 2 && (
          <CaseResultsReviewStep {...{
            facts: content?.facts, resolution: content?.resolution, setCaseStepIndex, title: content?.title 
          }}
          />
        )}
      </div>
    </>
  );
};

export default DetailsPage;
