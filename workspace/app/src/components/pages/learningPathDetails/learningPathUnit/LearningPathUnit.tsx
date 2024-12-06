import { Button } from "@/components/atoms/Button/Button";
import { LearningPathUnitCompleted } from "@/components/Icons/LearningPathUnitCompleted";
import { LearningPathUnitInProgress } from "@/components/Icons/LearningPathUnitInProgress";
import { LearningPathUnitUpcoming } from "@/components/Icons/LearningPathUnitUpcoming";
import { Puzzle } from "@/components/Icons/Puzzle";
import { LearningPathContentPiece } from "@/components/pages/learningPathDetails/learningPathUnit/learningPathContentPiece/LearningPathContentPiece";
import { LearningPathTestDrawer } from "@/components/pages/learningPathDetails/learningPathUnit/learningPathTestDrawer/LearningPathTestDrawer";
import useCasesProgress from "@/hooks/useCasesProgress";
import { useSeenArticles } from "@/hooks/useSeenArticles";

import { type IGenLearningPathUnit } from "@constellatio/cms/generated-types";
import { Title } from "@mantine/core";
import { type FunctionComponent, useState } from "react";

import * as sharedStyles from "../LearningPathDetails.styles";
import * as styles from "./LearningPathUnit.styles";

type unitStatusType = "completed" | "in-progress" | "upcoming";
export type testStatusType = "completed" | "in-progress" | "upcoming" | "not-started";

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
  const [openedTest, setOpenedTest] = useState<string | null>(null);

  console.log("openedTest", openedTest);

  let unitStatus: unitStatusType;
  let testStatus: testStatusType;

  if(index === 0)
  {
    unitStatus = "completed";
    testStatus = "in-progress";
  }
  else if(index === 1)
  {
    unitStatus = "in-progress";
    testStatus = "in-progress";
  }
  else if(index === 2)
  {
    unitStatus = "upcoming";
    testStatus = "not-started";
  }
  else
  {
    unitStatus = "upcoming";
    testStatus = "upcoming";
  }

  return (
    <>
      <div key={unit.id} id={unit.id!} css={styles.wrapper}>
        <div css={styles.visualPathWrapper}>
          <div css={unitStatus === "completed" && styles.iconWrapperCompleted}>
            {unitStatus === "completed" && <LearningPathUnitCompleted size={110}/>}
            {unitStatus === "in-progress" && <LearningPathUnitInProgress size={110}/>}
            {unitStatus === "upcoming" && <LearningPathUnitUpcoming size={110}/>}
          </div>
          {!isLastUnit && <div css={styles.connectingLine(unitStatus === "completed")}/>}
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
              let status: unitStatusType = "upcoming";

              if(contentPiece.__typename === "Case")
              {
                const caseProgress = casesProgress?.find(caseProgress => caseProgress.caseId === contentPiece.id);
                if(caseProgress?.progressState === "completed")
                {
                  status = "completed";
                }
                else if(caseProgress?.progressState === "not-started")
                {
                  status = "upcoming";
                }
                else if(caseProgress?.progressState === "completing-tests" || caseProgress?.progressState === "solving-case")
                {
                  status = "in-progress";
                }
              }
              else if(contentPiece.__typename === "Article")
              {
                status = seenArticles?.some(articleId => articleId === contentPiece.id) ? "completed" : "upcoming";
              }

              return (
                <LearningPathContentPiece
                  key={contentPiece.id}
                  contentPiece={contentPiece}
                  status={status}
                />
              );
            })}
          </div>
          <ul css={styles.testList}>
            {unit.caseLearningTest?.filter(Boolean).map((learningTest, learningTestIndex) => (
              <li key={learningTest.id}>
                <div css={styles.container2(testStatus)}>
                  <Puzzle size={32}/>
                  <div css={styles.contentWrapper}>
                    <Title order={4}>
                      {learningTest.__typename} {learningTestIndex + 1}
                    </Title>
                    <p>
                      {testStatus === "upcoming" && "Schließe das vorherige Modul ab, um diesen Test freizuschalten"}
                      {(testStatus === "not-started" || testStatus === "in-progress") && "Teste dein Wissen und schließe das Modul ab!"}
                      {testStatus === "completed" && "Super! Du hast diesen Test erfolgreich abgeschlossen."}
                    </p>
                  </div>
                  <Button<"button">
                    onClick={() =>
                    {
                      console.log("start test", learningTest.id);
                      setOpenedTest(learningTest.id!);
                    }}
                    styleType="secondarySimple">
                    {(testStatus === "upcoming" || testStatus === "not-started") && "Test starten"}
                    {testStatus === "in-progress" && "Test fortsetzen"}
                    {testStatus === "completed" && "Test neu starten"}
                  </Button>
                </div>
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
