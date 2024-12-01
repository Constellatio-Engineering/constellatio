/* eslint-disable max-lines */
import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import CaseCompleteTestsStep from "@/components/organisms/caseCompleteTestsStep/CaseCompleteTestsStep";
import CaseNavBar from "@/components/organisms/caseNavBar/CaseNavBar";
import CaseResultsReviewStep from "@/components/organisms/caseResultsReviewStep/CaseResultsReviewStep";
import CaseSolveCaseStep from "@/components/organisms/caseSolveCaseStep/CaseSolveCaseStep";
import CaseSolvingHeader from "@/components/organisms/caseSolvingHeader/CaseSolvingHeader";
import { useAddContentItemView } from "@/hooks/useAddContentItemView";
import useCaseProgress from "@/hooks/useCaseProgress";
import useGamesProgress from "@/hooks/useGamesProgress";
import useCaseSolvingStore, { type CaseStepIndex } from "@/stores/caseSolving.store";

import { type FullLegalCase } from "@constellatio/cms/content/getCaseById";
import { type ArticleWithNextAndPreviousArticleId } from "@constellatio/cms/utils/articles";
import { getGamesFromCase } from "@constellatio/cms/utils/case";
import { appPaths } from "@constellatio/shared/paths";
import { type FunctionComponent, useEffect } from "react";

import * as styles from "./DetailsPage.styles";
import ErrorPage from "../errorPage/ErrorPage";

type IDetailsPageProps = {
  readonly content: FullLegalCase | ArticleWithNextAndPreviousArticleId | undefined;
  readonly variant: "case" | "dictionary";
};

const DetailsPage: FunctionComponent<IDetailsPageProps> = ({ content, variant }) => 
{
  const contentId = content?.id;
  const caseId = content?.__typename === "Case" ? contentId : undefined;
  const { mutate: addContentItemView } = useAddContentItemView();
  const { caseProgress, isLoading: isCaseProgressLoading } = useCaseProgress(caseId);
  const { data: gamesProgress, isLoading: isGamesProgressLoading } = useGamesProgress(caseId);
  const games = content?.__typename === "Case" ? getGamesFromCase(content) : [];
  const caseStepIndex = useCaseSolvingStore(s => s.caseStepIndex);
  const progressState = caseProgress?.progressState;

  useEffect(() =>
  {
    if(!contentId || !content?.__typename)
    {
      return;
    }

    addContentItemView({
      itemId: contentId,
      itemType: content?.__typename === "Case" ? "case" : "article"
    });
  }, [addContentItemView, content?.__typename, contentId]);

  useEffect(() =>
  {
    if(progressState == null)
    {
      return;
    }

    let _caseStepIndex: CaseStepIndex;

    switch (progressState)
    {
      case "not-started":
      {
        _caseStepIndex = 0;
        break;
      }
      case "completing-tests":
      {
        _caseStepIndex = 0;
        break;
      }
      case "solving-case":
      {
        _caseStepIndex = 1;
        break;
      }
      case "completed":
      {
        _caseStepIndex = 2;
        break;
      }
      default:
      {
        _caseStepIndex = 0;
        break;
      }
    }

    useCaseSolvingStore.getState().setCaseStepIndex(_caseStepIndex);

  }, [progressState]);

  if(contentId == null)
  {
    return (
      <ErrorPage error="case/article ID was not found"/>
    );
  }

  if((isCaseProgressLoading || isGamesProgressLoading || caseStepIndex == null) && variant === "case")
  {
    return null;
  }

  if((caseProgress == null || gamesProgress == null) && variant === "case")
  {
    return (
      <ErrorPage error="case progress was not found"/>
    );
  }

  const currentGameIndex = games.findIndex(game =>
  {
    const gameProgress = gamesProgress?.find(gameProgress => gameProgress.gameId === game.id);
    const hasCompletedGame = gameProgress?.results.some(({ progressState }) => progressState === "completed");
    return !hasCompletedGame;
  });

  const currentGame = currentGameIndex === -1 ? games[0]! : games[currentGameIndex]!;
  const currentGameIndexInFullTextTasksJson = currentGame?.indexInFullTextTasksJson || 0;
  const mainCategoryName = content?.mainCategoryField?.[0]?.mainCategory;
  const legalAreaName = content?.legalArea?.legalAreaName;
  const topicName = content?.topic?.[0]?.topicName;

  return (
    <>
      <CaseSolvingHeader
        title={content?.title ?? ""}
        variant={variant}
        previousArticleId={content?.__typename === "Article" ? content?.previousArticleId : null}
        nextArticleId={content?.__typename === "Article" ? content?.nextArticleId : null}
        caseId={content?.id}
        breadcrumbs={[
          {
            path: variant === "case" ? appPaths.cases : appPaths.dictionary,
            slug: variant === "case" ? "Fälle" : "Lexikon" 
          },
          mainCategoryName && {
            path: `${appPaths.search}?find=${mainCategoryName}`,
            slug: mainCategoryName
          },
          legalAreaName && {
            path: `${appPaths.search}?find=${legalAreaName}`,
            slug: legalAreaName
          },
          topicName && {
            path: `${appPaths.search}?find=${topicName}`,
            slug: topicName
          },
        ].filter(Boolean)}
        overviewCard={{
          contentId,
          contentTitle: content?.title,
          lastUpdated: content?._meta?.updatedAt,
          legalArea: content?.legalArea,
          progressState: caseProgress?.progressState,
          tags: content?.tags,
          timeInMinutes: content?.__typename === "Case" && content.durationToCompleteInMinutes ? content.durationToCompleteInMinutes : undefined,
          topic: content?.topic?.[0]?.topicName ?? "",
          variant,
        }}
      />
      {
        variant === "case" && (
          <CaseNavBar
            variant={variant}
            caseStepIndex={caseStepIndex!}
            caseProgressState={caseProgress!.progressState}
          />
        )
      }
      <div css={styles.mainContainer}>
        <ContentWrapper shouldUseMarginAutoInsteadOfTransform>
          {content?.fullTextTasks && (variant === "case" ? caseStepIndex === 0 : true) && (
            <CaseCompleteTestsStep
              currentGameIndexInFullTextTasksJson={currentGameIndexInFullTextTasksJson}
              games={games}
              gamesProgress={gamesProgress}
              currentGame={currentGame}
              caseId={contentId}
              facts={content?.__typename === "Case" ? content?.facts : undefined}
              fullTextTasks={content?.fullTextTasks}
              progressState={caseProgress?.progressState}
              variant={variant}
            />
          )}
          {content?.__typename === "Case" && caseStepIndex === 1 && (
            <CaseSolveCaseStep
              id={contentId}
              progressState={caseProgress?.progressState}
              facts={content?.facts}
              title={content?.title}
            />
          )}
          {content?.__typename === "Case" && content?.facts && content?.resolution && content?.title && caseStepIndex === 2 && (
            <CaseResultsReviewStep
              caseId={contentId}
              facts={content?.facts}
              resolution={content?.resolution}
              title={content?.title}
            />
          )}
        </ContentWrapper>
      </div>
    </>
  );
};

export default DetailsPage;
