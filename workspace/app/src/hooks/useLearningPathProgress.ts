import useCasesProgress from "@/hooks/useCasesProgress";
import useGamesProgress from "@/hooks/useGamesProgress";
import { useSeenArticles } from "@/hooks/useSeenArticles";

import { getGamesFromCase } from "@constellatio/cms/utils/case";
import { type LearningPathWithExtraData } from "@constellatio/cms/utils/learningPaths";
import { useMemo } from "react";

type CompletedProgressState = "completed";
type InProgressProgressState = "in-progress";
type UpcomingProgressState = "upcoming";

type LearningPathProgressState = CompletedProgressState | InProgressProgressState | UpcomingProgressState;
type CaseLearningPathProgressState = CompletedProgressState | InProgressProgressState | UpcomingProgressState;
type ArticleLearningPathProgressState = CompletedProgressState | UpcomingProgressState;
export type CaseLearningTestProgressState = CompletedProgressState | InProgressProgressState | UpcomingProgressState;

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
    isPending: isGamesProgressPending
  } = useGamesProgress({ gamesIds: allGameIdsInLearningPath, queryType: "byGameIds" }, { refetchOnMount: true });

  const unitsWithProgress = useMemo(() => allUnits.map((unit, index) =>
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
      const gamesInLearningTest = getGamesFromCase(learningTest);
      const gamesWithProgress = gamesInLearningTest.map(game =>
      {
        const gameProgress = gamesProgress?.find(gameProgress => gameProgress.gameId === game.id);
        const isCompleted = gameProgress?.results.some(({ progressState }) => progressState === "completed") ?? false;
        const wasSolvedCorrectly = gameProgress?.results.some(({ wasSolvedCorrectly }) => wasSolvedCorrectly) ?? false;

        return ({
          ...game,
          isCompleted,
          wasSolvedCorrectly
        });
      });

      const isCompleted = gamesWithProgress.every(game => game.isCompleted);

      let learningTestProgressState: CaseLearningTestProgressState;

      if(isCompleted)
      {
        learningTestProgressState = "completed";
        completedCaseLearningTestsCount++;
      }
      else if(areAllContentPiecesCompleted)
      {
        learningTestProgressState = "in-progress";
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

    let progressState: LearningPathProgressState;

    if(completedContentPiecesCount === 0)
    {
      progressState = "upcoming";
    }
    else if(areAllContentPiecesCompleted && areAllCaseLearningTestsCompleted)
    {
      progressState = "completed";
    }
    else
    {
      progressState = "in-progress";
    }

    if(index === 0 && progressState !== "completed")
    {
      progressState = "in-progress";
    }

    return ({
      ...unit,
      caseLearningTests: caseLearningTestsWithProgress,
      completedTasksCount,
      contentPieces: allContentPiecesWithProgress,
      progressState,
      totalTasksCount
    });
  }), [allUnits, casesProgress, gamesProgress, seenArticles]);

  for(let i = 1; i < unitsWithProgress.length; i++)
  {
    const unitBefore = unitsWithProgress[i - 1]!;

    if(unitBefore.progressState !== "completed")
    {
      unitsWithProgress[i]!.progressState = "upcoming";
    }
  }

  const areAllUnitsCompleted = unitsWithProgress.every(unit => unit.progressState === "completed");
  const completedUnitsCount = unitsWithProgress.filter(unit => unit.progressState === "completed").length;

  return {
    ...learningPath,
    completedUnitsCount,
    isCompleted: areAllUnitsCompleted,
    isPending: isCasesProgressPending || isSeenArticlesPending || isGamesProgressPending,
    units: unitsWithProgress
  };
};

export type LearningPathWithProgress = ReturnType<typeof useLearningPathProgress>;
