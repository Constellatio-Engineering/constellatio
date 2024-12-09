import { LearningPathUnitCompleted } from "@/components/Icons/LearningPathUnitCompleted";
import { LearningPathUnitInProgress } from "@/components/Icons/LearningPathUnitInProgress";
import { LearningPathUnitUpcoming } from "@/components/Icons/LearningPathUnitUpcoming";
import { type LearningPathDetailsPageProps } from "@/components/pages/learningPathDetails/LearningPathDetails";
import { LearningPathContentPiece } from "@/components/pages/learningPathDetails/learningPathUnit/learningPathContentPiece/LearningPathContentPiece";
import { LearningPathTest } from "@/components/pages/learningPathDetails/learningPathUnit/learningPathTest/LearningPathTest";

import { Title } from "@mantine/core";
import { type FunctionComponent, useState } from "react";

import * as sharedStyles from "../LearningPathDetails.styles";
import * as styles from "./LearningPathUnit.styles";

export type LearningPathUnitProps = {
  readonly index: number;
  readonly isLastUnit: boolean;
  readonly refetchGamesProgress: () => void;
  readonly unit: LearningPathDetailsPageProps["units"][number];
};

export const LearningPathUnit: FunctionComponent<LearningPathUnitProps> = ({
  index,
  isLastUnit,
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
      <div css={[sharedStyles.card, styles.unit, progressState === "upcoming" && styles.unitDisabled]}>
        <Title order={2} css={styles.unitTitle}>
          Lektion {index + 1} - {title}
        </Title>
        <p css={styles.unitCompletedCount}>
          {completedTasksCount} / {totalTasksCount}
        </p>
        <div css={styles.unitContentPieces}>
          {contentPieces?.filter(Boolean).map(contentPiece => (
            <LearningPathContentPiece
              key={contentPiece.id}
              {...contentPiece}
            />
          ))}
        </div>
        <ul css={styles.testList}>
          {caseLearningTests?.filter(Boolean).map((learningTest, learningTestIndex) => (
            <LearningPathTest
              key={learningTest.id}
              {...learningTest}
              refetchGamesProgress={refetchGamesProgress}
              learningTestIndex={learningTestIndex}
              learningTest={learningTest}
              openTest={() => setOpenedTest(learningTest.id!)}
              openedTest={openedTest}
              closeTest={() => setOpenedTest(null)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
