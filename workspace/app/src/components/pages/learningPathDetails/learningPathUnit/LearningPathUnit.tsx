import { Button } from "@/components/atoms/Button/Button";
import { LearningPathUnitCompleted } from "@/components/Icons/LearningPathUnitCompleted";
import { LearningPathUnitInProgress } from "@/components/Icons/LearningPathUnitInProgress";
import { LearningPathUnitUpcoming } from "@/components/Icons/LearningPathUnitUpcoming";
import { Puzzle } from "@/components/Icons/Puzzle";
import { LearningPathContentPiece } from "@/components/pages/learningPathDetails/learningPathUnit/learningPathContentPiece/LearningPathContentPiece";
import { LearningPathTestDrawer } from "@/components/pages/learningPathDetails/learningPathUnit/learningPathTestDrawer/LearningPathTestDrawer";
import { type UnitWithProgress } from "@/hooks/useLearningPathProgress";

import { Title } from "@mantine/core";
import { type FunctionComponent, useState } from "react";

import * as sharedStyles from "../LearningPathDetails.styles";
import * as styles from "./LearningPathUnit.styles";

type unitStatusType = "completed" | "in-progress" | "upcoming";

type Props = {
  readonly index: number;
  readonly isLastUnit: boolean;
  readonly unit: UnitWithProgress;
};

export const LearningPathUnit: FunctionComponent<Props> = ({ index, isLastUnit, unit }) =>
{
  const [openedTest, setOpenedTest] = useState<string | null>(null);

  return (
    <>
      <div key={unit.id} id={unit.id!} css={styles.wrapper}>
        <div css={styles.visualPathWrapper}>
          <div css={unit.progressState === "completed" && styles.iconWrapperCompleted}>
            {unit.progressState === "completed" && <LearningPathUnitCompleted size={110}/>}
            {unit.progressState === "in-progress" && <LearningPathUnitInProgress size={110}/>}
            {unit.progressState === "upcoming" && <LearningPathUnitUpcoming size={110}/>}
          </div>
          {!isLastUnit && <div css={styles.connectingLine(unit.progressState === "completed")}/>}
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
                const caseProgress = unit.casesProgress?.find(caseProgress => caseProgress.caseId === contentPiece.id);
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
                status = unit.seenArticles?.some(articleId => articleId === contentPiece.id) ? "completed" : "upcoming";
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
                <div css={styles.container}>
                  <Puzzle size={32}/>
                  <div css={styles.contentWrapper}>
                    <Title order={4}>
                      {learningTest.__typename} {learningTestIndex + 1}
                    </Title>
                    <p>To complete the module please master this test</p>
                  </div>
                  <Button<"button">
                    onClick={() =>
                    {
                      console.log("start test", learningTest.id);
                      setOpenedTest(learningTest.id!);
                    }}
                    styleType="secondarySimple">
                    Start the test
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
