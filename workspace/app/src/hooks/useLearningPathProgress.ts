/* eslint-disable max-lines */
import { unitCompletedCount } from "@/components/pages/learningPathDetails/learningPathUnit/LearningPathUnit.styles";
import useCasesProgress from "@/hooks/useCasesProgress";
import useGamesProgress from "@/hooks/useGamesProgress";
import { useSeenArticles } from "@/hooks/useSeenArticles";

import { getGamesFromCase } from "@constellatio/cms/utils/case";
import { type LearningPathWithExtraData } from "@constellatio/cms/utils/learningPaths";
import { useMemo } from "react";

type CompletedProgressState = "completed";
type InProgressProgressState = "in-progress";
type UpcomingProgressState = "upcoming";
type NotStartedProgressState = "not-started";

export type LearningPathProgressState = CompletedProgressState | InProgressProgressState | UpcomingProgressState;
type CaseLearningPathProgressState = CompletedProgressState | InProgressProgressState | UpcomingProgressState;
type ArticleLearningPathProgressState = CompletedProgressState | UpcomingProgressState;
export type CaseLearningTestProgressState = CompletedProgressState | InProgressProgressState | UpcomingProgressState | NotStartedProgressState;

export const useLearningPathProgress = (learningPath: LearningPathWithExtraData) =>
{
  const {
    allArticleIdsInLearningPath,
    allCaseIdsInLearningPath,
    allGameIdsInLearningPath,
    allUnits
  } = learningPath;

  const {
    data: casesProgress,
    isPending: isCasesProgressPending
  } = useCasesProgress({ caseIds: allCaseIdsInLearningPath }, { refetchOnMount: true });
  const {
    data: seenArticles,
    isPending: isSeenArticlesPending
  } = useSeenArticles({ articleIds: allArticleIdsInLearningPath }, { refetchOnMount: true });
  const {
    data: gamesProgress,
    isPending: isGamesProgressPending,
    refetch: refetchGamesProgress
  } = useGamesProgress({ gamesIds: allGameIdsInLearningPath, queryType: "byGameIds" }, { refetchOnMount: true });

  const _unitsWithProgress = useMemo(() => allUnits.map((unit) =>
  {
    let completedContentPiecesCount = 0;
    let completedCaseLearningTestsCount = 0;

    const allContentPiecesWithProgress = (unit.contentPieces?.filter(Boolean) ?? []).map(contentPiece =>
    {
      if(contentPiece.__typename === "Case")
      {
        const _progressState = casesProgress?.find(p => p.caseId === contentPiece.id)?.progressState;

        let caseLearningPathProgressState: CaseLearningPathProgressState;

        switch (_progressState)
        {
          case "completed":
          {
            completedContentPiecesCount++;
            caseLearningPathProgressState = "completed";
            break;
          }
          case "completing-tests":
          case "solving-case":
          {
            caseLearningPathProgressState = "in-progress";
            break;
          }
          default:
          {
            caseLearningPathProgressState = "upcoming";
            break;
          }
        }

        return ({
          ...contentPiece,
          progressState: caseLearningPathProgressState
        });
      }
      else
      {
        const wasSeen = seenArticles?.some(articleId => articleId === contentPiece.id) ?? false;

        let progressState: ArticleLearningPathProgressState;

        if(wasSeen)
        {
          completedContentPiecesCount++;
          progressState = "completed";
        }
        else
        {
          progressState = "upcoming";
        }

        return ({
          ...contentPiece,
          progressState,
        });
      }
    });

    const areAllContentPiecesCompleted = allContentPiecesWithProgress.every(contentPiece => contentPiece.progressState === "completed");
    const allCaseLearningTestsOfUnit = unit.caseLearningTests?.filter(Boolean) ?? [];

    const caseLearningTestsWithProgress = allCaseLearningTestsOfUnit.map(learningTest =>
    {
      let completedGamesCount = 0;

      const gamesInLearningTest = getGamesFromCase(learningTest);
      const gamesWithProgress = gamesInLearningTest.map(game =>
      {
        const gameProgress = gamesProgress?.find(gameProgress => gameProgress.gameId === game.id);
        // const isCompleted = gameProgress?.results.some(({ progressState }) => progressState === "completed") ?? false;
        const wasSolvedCorrectly = gameProgress?.results.some(({ wasSolvedCorrectly }) => wasSolvedCorrectly) ?? false;

        if(wasSolvedCorrectly)
        {
          completedGamesCount++;
        }

        return ({
          ...game,
          // isCompleted,
          wasSolvedCorrectly
        });
      });

      const isCompleted = gamesWithProgress.every(game => game.wasSolvedCorrectly);

      let learningTestProgressState: CaseLearningTestProgressState;

      if(isCompleted)
      {
        learningTestProgressState = "completed";
        completedCaseLearningTestsCount++;
      }
      else if(areAllContentPiecesCompleted)
      {
        if(completedGamesCount === 0)
        {
          learningTestProgressState = "not-started";
        }
        else
        {
          learningTestProgressState = "in-progress";
        }
      }
      else
      {
        learningTestProgressState = "upcoming";
      }

      return ({
        ...learningTest,
        gamesWithProgress,
        isCompleted,
        progressState: learningTestProgressState
      });
    });

    const areAllCaseLearningTestsCompleted = caseLearningTestsWithProgress.every(learningTest => learningTest.isCompleted);
    const totalTasksCount = allContentPiecesWithProgress.length + allCaseLearningTestsOfUnit.length;
    const completedTasksCount = completedContentPiecesCount + completedCaseLearningTestsCount;
    const isCompleted = (areAllContentPiecesCompleted && areAllCaseLearningTestsCompleted);

    return ({
      ...unit,
      caseLearningTests: caseLearningTestsWithProgress,
      completedTasksCount,
      contentPieces: allContentPiecesWithProgress,
      isCompleted,
      totalTasksCount
    });
  }), [allUnits, casesProgress, gamesProgress, seenArticles]);

  let incompleteUnitBeforeFound = false;

  const unitsWithProgress = _unitsWithProgress.map((unit, i) =>
  {
    const unitBefore = _unitsWithProgress[i - 1];

    if(!unit.isCompleted)
    {
      incompleteUnitBeforeFound = true;
    }

    let progressState: LearningPathProgressState | undefined;

    if(i === 0 && !unit.isCompleted)
    {
      progressState = "in-progress";
    }
    else if(unitBefore?.isCompleted && !unit.isCompleted)
    {
      progressState = "in-progress";
    }
    else if(unit.isCompleted && !incompleteUnitBeforeFound)
    {
      progressState = "completed";
    }
    else
    {
      progressState = "upcoming";
    }

    return ({
      ...unit,
      progressState
    });
  });

  const areAllUnitsCompleted = unitsWithProgress.every(unit => unit.progressState === "completed");
  const completedUnitsCount = unitsWithProgress.filter(unit => unit.progressState === "completed").length;

  return {
    ...learningPath,
    completedUnitsCount,
    isCompleted: areAllUnitsCompleted,
    isPending: isCasesProgressPending || isSeenArticlesPending || isGamesProgressPending,
    refetchGamesProgress,
    units: unitsWithProgress
  };
};

export type LearningPathWithProgress = ReturnType<typeof useLearningPathProgress>;
