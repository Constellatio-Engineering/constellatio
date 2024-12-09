import { Button } from "@/components/atoms/Button/Button";
import { LearningPathUnitCompleted } from "@/components/Icons/LearningPathUnitCompleted";
import { LearningPathUnitInProgress } from "@/components/Icons/LearningPathUnitInProgress";
import { LearningPathUnitUpcoming } from "@/components/Icons/LearningPathUnitUpcoming";
import { Puzzle } from "@/components/Icons/Puzzle";
import { type LearningPathDetailsPageProps } from "@/components/pages/learningPathDetails/LearningPathDetails";
import { LearningPathContentPiece } from "@/components/pages/learningPathDetails/learningPathUnit/learningPathContentPiece/LearningPathContentPiece";
import { LearningPathTestDrawer } from "@/components/pages/learningPathDetails/learningPathUnit/learningPathTestDrawer/LearningPathTestDrawer";

import { Title } from "@mantine/core";
import { type FunctionComponent, useState } from "react";

import * as sharedStyles from "../LearningPathDetails.styles";
import * as styles from "./LearningPathUnit.styles";

export type LearningPathUnitProps = {
  readonly index: number;
  readonly isLastUnit: boolean;
  readonly unit: LearningPathDetailsPageProps["units"][number];
};

export const LearningPathUnit: FunctionComponent<LearningPathUnitProps> = ({ index, isLastUnit, unit }) =>
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
            {unit.completedTasksCount} / {unit.totalTasksCount}
          </p>
          <div css={styles.unitContentPieces}>
            {unit.contentPieces?.filter(Boolean).map(contentPiece => (
              <LearningPathContentPiece
                key={contentPiece.id}
                {...contentPiece}
              />
            ))}
          </div>
          <ul css={styles.testList}>
            {unit.caseLearningTests?.filter(Boolean).map((learningTest, learningTestIndex) => (
              <li key={learningTest.id}>
                <div css={styles.container2(learningTest.isCompleted)}>
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
      {unit.caseLearningTests?.filter(Boolean).filter(l => l.id != null).map(learningTest => (
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
