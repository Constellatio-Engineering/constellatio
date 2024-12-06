import useCasesProgress from "@/hooks/useCasesProgress";
import useGamesProgress from "@/hooks/useGamesProgress";
import { useSeenArticles } from "@/hooks/useSeenArticles";

import type {
  IGenArticle, IGenCardSelectionGame, IGenCase, IGenDragNDropGame, IGenFillInGapsGame, IGenLearningPath 
} from "@constellatio/cms/generated-types";
import { useMemo } from "react";

type LearningPathProgressState = "completed" | "in-progress" | "upcoming";

export const useLearningPathProgress = (learningPath: IGenLearningPath) =>
{
  const {
    allContentPieces,
    allTestGamifications,
    allUnits,
    articles,
    cases
  } = useMemo(() =>
  {
    const cases: IGenCase[] = [];
    const articles: IGenArticle[] = [];

    const allUnits = learningPath.units?.filter(Boolean) ?? [];
    const allContentPieces = allUnits.flatMap(unit => unit.contentPieces?.filter(Boolean) ?? []) ?? [];
    const allTestGamifications = allUnits
      .flatMap(unit => unit.caseLearningTest?.filter(Boolean) ?? [])
      .flatMap(test => test.fullTextTasks?.connections?.filter(Boolean) ?? [])
      .filter(connection =>
      {
        return connection.__typename === "CardSelectionGame" || connection.__typename === "DragNDropGame" || connection.__typename === "FillInGapsGame";
      }) as Array<IGenFillInGapsGame | IGenDragNDropGame | IGenCardSelectionGame>;

    allContentPieces.forEach(contentPiece =>
    {
      if(contentPiece.__typename === "Case")
      {
        cases.push(contentPiece);
      }
      else if(contentPiece.__typename === "Article")
      {
        articles.push(contentPiece);
      }
    });

    return {
      allContentPieces, allTestGamifications, allUnits, articles, cases
    };
  }, [learningPath]);

  const allCaseIdsInLearningPath = useMemo(() => cases.map(caseItem => caseItem.id).filter(Boolean), [cases]);
  const allArticleIdsInLearningPath = useMemo(() => articles.map(articleItem => articleItem.id).filter(Boolean), [articles]);
  const allGameIdsInLearningPath = useMemo(() => allTestGamifications.map(game => game.id).filter(Boolean), [allTestGamifications]);

  const { data: casesProgress } = useCasesProgress({ caseIds: allCaseIdsInLearningPath }, { refetchOnMount: true });
  const { data: seenArticles } = useSeenArticles({ articleIds: allArticleIdsInLearningPath }, { refetchOnMount: true });
  const { data: gamesProgress } = useGamesProgress({ gamesIds: allGameIdsInLearningPath, queryType: "byGameIds" }, { refetchOnMount: true });

  const unitsWithProgress = useMemo(() => allUnits.map(unit =>
  {
    const seenArticlesCount = seenArticles?.length ?? 0;
    const completedCasesCount = casesProgress?.filter(caseProgress => caseProgress.progressState === "completed").length ?? 0;
    const completedGamesCount = gamesProgress?.filter(game => game.results.some((r) => r.progressState === "completed")).length ?? 0;
    const completedContentPieces = completedCasesCount + seenArticlesCount;

    let progressState: LearningPathProgressState;

    if(completedContentPieces === 0)
    {
      progressState = "upcoming";
    }
    else if((allContentPieces.length === completedCasesCount + seenArticlesCount) && (allTestGamifications.length === completedGamesCount))
    {
      progressState = "completed";
    }
    else
    {
      progressState = "in-progress";
    }

    return ({
      ...unit,
      casesProgress,
      completedCasesCount,
      completedGamesCount,
      gamesProgress,
      progressState,
      seenArticles,
      seenArticlesCount
    });
  }), [allContentPieces.length, allTestGamifications.length, allUnits, casesProgress, gamesProgress, seenArticles?.length]);

  return unitsWithProgress;
};

export type UnitWithProgress = ReturnType<typeof useLearningPathProgress>[number];
