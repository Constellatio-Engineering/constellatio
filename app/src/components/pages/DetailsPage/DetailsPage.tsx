import ErrorPage from "@/components/errorPage/ErrorPage";
import CaseCompleteTestsStep from "@/components/organisms/caseCompleteTestsStep/CaseCompleteTestsStep";
import CaseNavBar from "@/components/organisms/caseNavBar/CaseNavBar";
import CaseResultsReviewStep from "@/components/organisms/caseResultsReviewStep/CaseResultsReviewStep";
import CaseSolveCaseStep from "@/components/organisms/caseSolveCaseStep/CaseSolveCaseStep";
import CaseSolvingHeader from "@/components/organisms/caseSolvingHeader/CaseSolvingHeader";
import { slugFormatter } from "@/components/organisms/OverviewHeader/OverviewHeader";
import useArticleViews from "@/hooks/useArticleViews";
import useCaseProgress from "@/hooks/useCaseProgress";
import useCaseViews from "@/hooks/useCaseViews";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { type IGenArticle, type IGenCase } from "@/services/graphql/__generated/sdk";
import useCaseSolvingStore from "@/stores/caseSolving.store";
import { api } from "@/utils/api";
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
  const caseStepIndex = useCaseSolvingStore((state) => state.caseStepIndex);
  const contentId = content?.id;
  const caseId = content?.__typename === "Case" ? contentId : undefined;
  const articleId = content?.__typename === "Article" ? contentId : undefined;
  const { mutate: addArticleView } = api.views.addArticleView.useMutation({
    onSuccess: async () => invalidateArticleViews({ articleId: contentId! })
  });
  const { mutate: addCaseView } = api.views.addCaseView.useMutation({
    onSuccess: async () => invalidateCaseViews({ caseId: contentId! })
  });
  const wasViewCountUpdated = useRef<boolean>(false);
  const { count: articleViews } = useArticleViews(articleId);
  const { count: caseViews } = useCaseViews(caseId);
  const { caseProgress } = useCaseProgress(caseId);

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

  useEffect(() => 
  {
    const { setCaseStepIndex, setHasCaseSolvingStarted } = useCaseSolvingStore.getState();

    if(content?.__typename === "Article")
    {
      setCaseStepIndex(0);
      setHasCaseSolvingStarted(true);
    }
  }, [content?.__typename]);

  if(contentId == null)
  {
    return (
      <ErrorPage error="case/article ID was not found"/>
    );
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
          status: caseProgress?.progressState,
          tags: content?.tags,
          timeInMinutes: content?.__typename === "Case" && content.durationToCompleteInMinutes ? content.durationToCompleteInMinutes : undefined,
          topic: content?.topic?.[0]?.topicName ?? "",
          variant,
          views: content?.__typename === "Article" ? articleViews : caseViews,
        }}
      />
      <CaseNavBar
        variant={variant}
      />
      <div css={styles.mainContainer}>
        {content?.fullTextTasks && caseStepIndex === 0 && (
          <CaseCompleteTestsStep {...{
            caseId: contentId,
            facts: content?.__typename === "Case" ? content?.facts : undefined,
            fullTextTasks: content?.fullTextTasks,
            variant
          }}
          />
        )}
        {content?.__typename === "Case" && caseStepIndex === 1 && (
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
        )}
      </div>
    </>
  );
};

export default DetailsPage;
