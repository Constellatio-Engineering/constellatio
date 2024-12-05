import { LearningPathContentPiece } from "@/components/pages/learningPathDetails/learningPathUnit/learningPathContentPiece/LearningPathContentPiece";
import useCasesProgress from "@/hooks/useCasesProgress";
import { useSeenArticles } from "@/hooks/useSeenArticles";

import { type IGenLearningPathUnit } from "@constellatio/cms/generated-types";
import { Title } from "@mantine/core";
import { type FunctionComponent, useState } from "react";

import * as sharedStyles from "../LearningPathDetails.styles";
import { LearningPathTestDrawer } from "./learningPathTestDrawer/LearningPathTestDrawer";
import * as styles from "./LearningPathUnit.styles";

type Props = {
  readonly allArticleIdsInLearningPath: string[];
  readonly allCaseIdsInLearningPath: string[];
  readonly index: number;
  readonly isLastUnit: boolean;
  readonly unit: IGenLearningPathUnit;
};

export const LearningPathUnit: FunctionComponent<Props> = ({
  allArticleIdsInLearningPath,
  allCaseIdsInLearningPath,
  index,
  isLastUnit,
  unit
}) =>
{
  const { data: casesProgress } = useCasesProgress({ caseIds: allCaseIdsInLearningPath }, { refetchOnMount: true });
  const { data: seenArticles } = useSeenArticles({ articleIds: allArticleIdsInLearningPath }, { refetchOnMount: true });

  const [openedTest, setOpenedTest] = useState<string | null>("ba4c716e-a7ed-4dc5-b500-31707823d80b");

  console.log(unit.caseLearningTest);

  return (
    <>
      <div key={unit.id} css={styles.wrapper}>
        <div css={styles.visualPathWrapper}>
          <div style={{
            backgroundColor: "#efefef", height: 100, padding: 12, width: 100 
          }}>
            Icon here
          </div>
          {!isLastUnit && <div css={styles.connectingLine}/>}
        </div>
        <div css={[sharedStyles.card, styles.unit]}>
          <Title order={2} css={styles.unitTitle}>
            Lektion {index + 1} - {unit.title}
          </Title>
          <p css={styles.unitCompletedCount}>
            {0} / {(unit.contentPieces?.length ?? 0) + (unit.learningTests?.length ?? 0)}
          </p>
          <div css={styles.unitContentPieces}>
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
                <LearningPathContentPiece
                  key={contentPiece.id}
                  contentPiece={contentPiece}
                  isCompleted={isCompleted}
                />
              );
            })}
          </div>
          <ul style={{ listStylePosition: "inside" }}>
            {unit.learningTests?.filter(Boolean).map(learningTest => (
              <li key={learningTest.id}>
                {learningTest.__typename} - {learningTest.gamifications?.length} gamifications
              </li>
            ))}
          </ul>
        </div>
      </div>
      {unit.caseLearningTest?.filter(Boolean).filter(l => l.id != null).map(learningTest => (
        <LearningPathTestDrawer
          key={learningTest.id}
          closeDrawer={() => setOpenedTest(null)}
          caseLearningTest={learningTest}
          caseLearningTestId={learningTest.id!}
          isOpened={openedTest === learningTest.id}
        />
      ))}
    </>
  );
};
