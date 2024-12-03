import { Richtext } from "@/components/molecules/Richtext/Richtext";
import useCasesProgress from "@/hooks/useCasesProgress";
import { useSeenArticles } from "@/hooks/useSeenArticles";
import { api } from "@/utils/api";

import { type IGenArticle, type IGenCase, type IGenLearningPath } from "@constellatio/cms/generated-types";
import { type FunctionComponent, useMemo } from "react";

type Props = IGenLearningPath;

export const LearningPath: FunctionComponent<Props> = (learningPath) =>
{
  console.log("--------");
  console.log("learningPath", learningPath);

  const { articles, cases } = useMemo(() =>
  {
    const cases: IGenCase[] = [];
    const articles: IGenArticle[] = [];

    const allContentPieces = learningPath.units?.filter(Boolean).flatMap(unit => unit.contentPieces?.filter(Boolean) ?? []) ?? [];

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

    return { articles, cases };
  }, [learningPath]);

  const allCaseIdsInLearningPath = useMemo(() => cases.map(caseItem => caseItem.id).filter(Boolean), [cases]);
  const allArticleIdsInLearningPath = useMemo(() => articles.map(articleItem => articleItem.id).filter(Boolean), [articles]);

  const { data: casesProgress } = useCasesProgress({ caseIds: allCaseIdsInLearningPath }, { refetchOnMount: true });
  const { data: seenArticles } = useSeenArticles({ articleIds: allArticleIdsInLearningPath }, { refetchOnMount: true });

  return (
    <div style={{ border: "1px solid black", padding: 20 }}>
      <h1>{learningPath.title}</h1>
      <p>Estimated time to complete: {learningPath.estimatedDuration} minutes</p>
      <Richtext data={learningPath.description}/>
      <h2>Units</h2>
      {learningPath.units?.filter(Boolean).map((unit) => (
        <div key={unit.id} style={{ border: "1px solid black", marginTop: 10, padding: 20 }}>
          <h3 style={{ marginBottom: 6 }}>Content Pieces</h3>
          <ul style={{ listStylePosition: "inside" }}>
            {unit.contentPieces?.filter(Boolean).map(contentPiece =>
            {
              let isCompleted = false;

              if(contentPiece.__typename === "Case")
              {
                const caseProgress = casesProgress?.find(caseProgress => caseProgress.caseId === contentPiece.id);
                isCompleted = caseProgress?.progressState === "completed";
              }
              else if(contentPiece.__typename === "Article")
              {
                isCompleted = seenArticles?.some(articleId => articleId === contentPiece.id) ?? false;
              }

              return (
                <li key={contentPiece.id} style={{ backgroundColor: isCompleted ? "#aae0ad" : "#ffdca8" }}>
                  {contentPiece.__typename} - {contentPiece.title} - {isCompleted ? "completed" : "not completed"}
                </li>
              );
            })}
          </ul>
          <h3 style={{ marginBottom: 6, marginTop: 12 }}>Tests</h3>
          <ul style={{ listStylePosition: "inside" }}>
            {unit.learningTests?.filter(Boolean).map(learningTest => (
              <li key={learningTest.id}>
                {learningTest.__typename} - {learningTest.gamifications?.length} gamifications
              </li>
            ))}
          </ul>
        </div>
      ))}
      <ul/>
    </div>
  );
};
