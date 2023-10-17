import ErrorPage from "@/components/errorPage/ErrorPage";
import CaseCompleteTestsStep from "@/components/organisms/caseCompleteTestsStep/CaseCompleteTestsStep";
import CaseNavBar from "@/components/organisms/caseNavBar/CaseNavBar";
import CaseResultsReviewStep from "@/components/organisms/caseResultsReviewStep/CaseResultsReviewStep";
import CaseSolveCaseStep from "@/components/organisms/caseSolveCaseStep/CaseSolveCaseStep";
import CaseSolvingHeader from "@/components/organisms/caseSolvingHeader/CaseSolvingHeader";
import { slugFormatter } from "@/components/organisms/OverviewHeader/OverviewHeader";
import useCaseProgress from "@/hooks/useCaseProgress";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import useGamesProgress from "@/hooks/useGamesProgress";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { type IGenArticle, type IGenCase } from "@/services/graphql/__generated/sdk";
import { type CaseStepIndex } from "@/stores/caseSolving.store";
import { api } from "@/utils/api";
import { getGamesFromCase } from "@/utils/case";
import { paths } from "@/utils/paths";

import React, { useEffect, type FunctionComponent, useRef } from "react";

import * as styles from "./DetailsPage.styles";

type IDetailsPageProps = {
  readonly content: IGenCase | IGenArticle | undefined;
  readonly variant: "case" | "dictionary";
};

const DetailsPage: FunctionComponent<IDetailsPageProps> = ({ content, variant }) => 
{
  const { invalidateArticleViews, invalidateCaseViews } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const contentId = content?.id;
  const caseId = content?.__typename === "Case" ? contentId : undefined;
  const { mutate: addArticleView } = api.views.addArticleView.useMutation({
    onSuccess: async () => invalidateArticleViews({ articleId: contentId! })
  });
  const { mutate: addCaseView } = api.views.addCaseView.useMutation({
    onSuccess: async () => invalidateCaseViews({ caseId: contentId! })
  });
  const wasViewCountUpdated = useRef<boolean>(false);
  const { caseProgress, isLoading: isCaseProgressLoading } = useCaseProgress(caseId);
  const { gamesProgress, isLoading: isGamesProgressLoading } = useGamesProgress(caseId);
  const games = content?.__typename === "Case" ? getGamesFromCase(content) : [];

  useEffect(() =>
  {
    if(!contentId || !content?.__typename || wasViewCountUpdated.current)
    {
      return;
    }

    if(content?.__typename === "Case")
    {
      addCaseView({ caseId: contentId });
    }
    else if(content?.__typename === "Article")
    {
      addArticleView({ articleId: contentId });
    }

    wasViewCountUpdated.current = true;
  }, [addArticleView, addCaseView, content?.__typename, contentId]);

  /* useEffect(() =>
  {
    const { setCaseStepIndex, setHasCaseSolvingStarted } = useCaseSolvingStore.getState();

    if(content?.__typename === "Article")
    {
      setCaseStepIndex(0);
      setHasCaseSolvingStarted(true);
    }
  }, [content?.__typename]);*/

  if(contentId == null)
  {
    return (
      <ErrorPage error="case/article ID was not found"/>
    );
  }

  if(isCaseProgressLoading || isGamesProgressLoading)
  {
    return (
      <div>Loading...</div>
    );
  }

  if(caseProgress == null || gamesProgress == null)
  {
    return (
      <ErrorPage error="case progress was not found"/>
    );
  }

  let caseStepIndex: CaseStepIndex;

  switch (caseProgress.progressState)
  {
    case "not-started":
    {
      console.log("case not started, caseStepIndex = 0");
      caseStepIndex = 0;
      break;
    }
    case "in-progress":
    {
      if(gamesProgress.filter(({ progressState }) => progressState === "completed").length === games.length)
      {
        console.log("case in progress and all games completed, caseStepIndex = 1");
        caseStepIndex = 1;
      }
      else
      {
        console.log("case in progress and not all games completed, caseStepIndex = 0");
        caseStepIndex = 0;
      }
      break;
    }
    case "completed":
    {
      console.log("case completed, caseStepIndex = 2");
      caseStepIndex = 2;
      break;
    }
  }

  return (
    <>
      <CaseSolvingHeader
        title={content?.title ?? ""}
        variant={variant}
        pathSlugs={[
          {
            path: variant === "case" ? paths.cases : paths.dictionary,
            slug: variant === "case" ? "Cases" : "Dictionary" 
          },
          {
            path: variant === "case" ? `/cases?category=${slugFormatter(content?.mainCategoryField?.[0]?.mainCategory ?? "")}` : `/dictionary?category=${slugFormatter(content?.mainCategoryField?.[0]?.mainCategory ?? "")}`, 
            slug: content?.mainCategoryField?.[0]?.mainCategory ?? "" 
          },
          { 
            path: `/${variant === "case" ? "cases" : "dictionary"}/${content?.id}`, 
            slug: content?.title?.length && content?.title?.length > 40 ? content?.title?.slice(0, 40) + " ..." : content?.title ?? ""
          }
        ]}
        overviewCard={{
          contentId,
          lastUpdated: content?._meta?.updatedAt,
          legalArea: content?.legalArea,
          progressState: caseProgress?.progressState,
          tags: content?.tags,
          timeInMinutes: content?.__typename === "Case" && content.durationToCompleteInMinutes ? content.durationToCompleteInMinutes : undefined,
          topic: content?.topic?.[0]?.topicName ?? "",
          variant,
        }}
      />
      {/* <CaseNavBar variant={variant}/>*/}
      <div css={styles.mainContainer}>
        {content?.fullTextTasks && caseStepIndex === 0 && (
          <CaseCompleteTestsStep
            games={games}
            gamesProgress={gamesProgress}
            caseId={contentId}
            facts={content?.__typename === "Case" ? content?.facts : undefined}
            fullTextTasks={content?.fullTextTasks}
            progressState={caseProgress?.progressState}
            variant={variant}
          />
        )}
        {/* {content?.__typename === "Case" && caseStepIndex === 1 && (
          <CaseSolveCaseStep {...{
            facts: content?.facts,
            title: content?.title
          }}
          />
        )}
        {content?.__typename === "Case" && content?.facts && content?.resolution && content?.title && caseStepIndex === 2 && (
          <CaseResultsReviewStep {...{
            facts: content?.facts,
            resolution: content?.resolution,
            title: content?.title
          }}
          />
        )}*/}
      </div>
    </>
  );
};

export default DetailsPage;
