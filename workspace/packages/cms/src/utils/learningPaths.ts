import { getGamesFromCase } from "./case";
import type {
  IGenArticle, IGenCase, IGenLearningPath
} from "../graphql/__generated/sdk";

export const getLearningPathExtraData = (learningPath: IGenLearningPath) =>
{
  const allUnits = learningPath.units?.filter(Boolean) ?? [];
  const allContentPieces = allUnits.flatMap(unit => unit.contentPieces?.filter(Boolean) ?? []) ?? [];
  const allTestGamifications = allUnits
    .flatMap(unit => unit.caseLearningTests?.filter(Boolean) ?? [])
    .flatMap(getGamesFromCase);

  const allCases: IGenCase[] = [];
  const allArticles: IGenArticle[] = [];

  allContentPieces.forEach(contentPiece =>
  {
    if(contentPiece.__typename === "Case")
    {
      allCases.push(contentPiece);
    }
    else if(contentPiece.__typename === "Article")
    {
      allArticles.push(contentPiece);
    }
  });

  const totalTasks = allUnits
    ?.filter(Boolean)
    .reduce((total, unit) => total + (unit.caseLearningTests?.length ?? 0) + (unit.contentPieces?.length ?? 0), 0);

  const allCaseIdsInLearningPath = allCases.map(caseItem => caseItem.id).filter(Boolean);
  const allArticleIdsInLearningPath = allArticles.map(articleItem => articleItem.id).filter(Boolean);
  const allGameIdsInLearningPath = allTestGamifications.map(game => game.id).filter(Boolean);

  return {
    ...learningPath,
    allArticleIdsInLearningPath,
    allArticles,
    allCaseIdsInLearningPath,
    allCases,
    allContentPieces,
    allGameIdsInLearningPath,
    allTestGamifications,
    allUnits,
    totalTasks
  };
};

export type LearningPathWithExtraData = ReturnType<typeof getLearningPathExtraData>;
