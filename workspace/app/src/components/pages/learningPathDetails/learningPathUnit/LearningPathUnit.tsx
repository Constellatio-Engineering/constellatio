import StatusLabel from "@/components/atoms/statusLabel/StatusLabel";
import { LearningPathUnitCompleted } from "@/components/Icons/LearningPathUnitCompleted";
import { LearningPathUnitInProgress } from "@/components/Icons/LearningPathUnitInProgress";
import { LearningPathUnitUpcoming } from "@/components/Icons/LearningPathUnitUpcoming";
import { LearningPathCompletedCard } from "@/components/pages/learningPathDetails/learningPathCompletedCard/LearningPathCompletedCard";
import { LearningPathContentPiece } from "@/components/pages/learningPathDetails/learningPathUnit/learningPathContentPiece/LearningPathContentPiece";
import { LearningPathTest } from "@/components/pages/learningPathDetails/learningPathUnit/learningPathTest/LearningPathTest";
import { type LearningPathWithProgress } from "@/hooks/useLearningPathProgress";

import { Title } from "@mantine/core";
import { type FunctionComponent, useState } from "react";

import * as sharedStyles from "../LearningPathDetails.styles";
import * as styles from "./LearningPathUnit.styles";

export type LearningPathUnitProps = {
  readonly index: number;
  readonly isLastUnit: boolean;
  readonly isLearningPathCompleted: boolean;
  readonly learningPathId: string;
  readonly refetchGamesProgress: () => void;
  readonly unit: LearningPathWithProgress["units"][number];
};

export const LearningPathUnit: FunctionComponent<LearningPathUnitProps> = ({
  index,
  isLastUnit,
  isLearningPathCompleted,
  learningPathId,
  refetchGamesProgress,
  unit
}) =>
{
  const [openedTest, setOpenedTest] = useState<string | null>(null);
  const {
    caseLearningTests,
    completedTasksCount,
    contentPieces,
    id,
    progressState,
    title,
    totalTasksCount
  } = unit;
  
  return (
    <div key={id} id={id!} css={styles.wrapper}>
      <div css={styles.visualPathWrapper}>
        <div css={progressState === "completed" && styles.iconWrapperCompleted}>
          {progressState === "completed" && <LearningPathUnitCompleted size={110}/>}
          {progressState === "in-progress" && <LearningPathUnitInProgress size={110}/>}
          {progressState === "upcoming" && <LearningPathUnitUpcoming size={110}/>}
        </div>
        {!isLastUnit && (
          <div css={styles.connectingLine(progressState === "completed")}/>
        )}
      </div>
      <div css={styles.unitWrapper}>
        <div css={[sharedStyles.card, styles.unit, progressState === "upcoming" && styles.unitDisabled]}>
          <div css={styles.unitTitleWrapper}>
            <Title order={2} css={styles.unitTitle}>
              Lektion {index + 1} - {title}
            </Title>
            <div css={styles.unitProgressStateBadgeWrapper}>
              <StatusLabel progressState={progressState} overwrites={{ completed: "Abgeschlossen" }}/>
            </div>
          </div>
          <p css={styles.unitCompletedCount}>
            {completedTasksCount}/{totalTasksCount}
          </p>
          <div css={styles.unitContentPieces}>
            {contentPieces?.filter(Boolean).map(contentPiece => (
              <LearningPathContentPiece
                key={contentPiece.id}
                learningPathId={learningPathId}
                unitId={unit.id!}
                {...contentPiece}
              />
            ))}
          </div>
          <ul css={styles.testList}>
            {caseLearningTests?.filter(Boolean).map((learningTest) =>
            {
              if(learningTest.gamesWithProgress.length === 0)
              {
                return null;
              }

              return (
                <LearningPathTest
                  key={learningTest.id}
                  {...learningTest}
                  refetchGamesProgress={refetchGamesProgress}
                  learningTest={learningTest}
                  openTest={() => setOpenedTest(learningTest.id!)}
                  openedTest={openedTest}
                  closeTest={() => setOpenedTest(null)}
                />
              );
            })}
          </ul>
        </div>
        {(isLearningPathCompleted && isLastUnit) && (
          <LearningPathCompletedCard/>
        )}
      </div>
    </div>
  );
};
