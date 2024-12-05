/* eslint-disable max-lines */
import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import { LearningPathHeader } from "@/components/pages/learningPathDetails/learningPathHeader/LearningPathHeader";
import { LearningPathUnit } from "@/components/pages/learningPathDetails/learningPathUnit/LearningPathUnit";

import { type IGenArticle, type IGenCase, type IGenLearningPath } from "@constellatio/cms/generated-types";
import { type FunctionComponent, useMemo } from "react";

import * as styles from "./LearningPathDetails.styles";

type Props = IGenLearningPath;

export const LearningPathDetailsPage: FunctionComponent<Props> = (learningPath) =>
{
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

  const totalTasks = learningPath.units
    ?.filter(Boolean)
    .reduce((total, unit) => total + (unit.learningTests?.length ?? 0) + (unit.contentPieces?.length ?? 0), 0);

  return (
    <ContentWrapper stylesOverrides={styles.contentWrapper}>
      <div css={styles.layoutWrapper}>
        <div css={styles.unitsColumn}>
          {learningPath.units?.filter(Boolean).map((unit, index) => (
            <LearningPathUnit
              key={unit.id}
              index={index}
              isLastUnit={index === (learningPath.units?.length ?? 0) - 1}
              unit={unit}
              allArticleIdsInLearningPath={allArticleIdsInLearningPath}
              allCaseIdsInLearningPath={allCaseIdsInLearningPath}
            />
          ))}
        </div>
        <LearningPathHeader
          description={learningPath.description}
          estimatedDuration={learningPath.estimatedDuration}
          title={learningPath.title}
          totalTasks={totalTasks ?? 0}
        />
      </div>
    </ContentWrapper>
  );
};
