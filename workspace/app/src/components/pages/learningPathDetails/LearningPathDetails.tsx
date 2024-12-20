import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import {
  LearningPathCompletedCard
} from "@/components/pages/learningPathDetails/learningPathCompletedCard/LearningPathCompletedCard";
import { LearningPathHeader } from "@/components/pages/learningPathDetails/learningPathHeader/LearningPathHeader";
import { LearningPathUnit } from "@/components/pages/learningPathDetails/learningPathUnit/LearningPathUnit";
import { useLearningPathProgress } from "@/hooks/useLearningPathProgress";
import { type GetLearningPathDetailPagePropsResult } from "@/pages/learning-paths/[id]";

import { type FunctionComponent } from "react";

import * as styles from "./LearningPathDetails.styles";

export type LearningPathDetailsPageProps = GetLearningPathDetailPagePropsResult["learningPath"];

export const LearningPathDetailsPage: FunctionComponent<LearningPathDetailsPageProps> = (learningPath) =>
{
  const {
    isCompleted,
    refetchGamesProgress,
    totalTasks,
    units
  } = useLearningPathProgress(learningPath);

  return (
    <ContentWrapper stylesOverrides={styles.contentWrapper}>
      <div css={styles.layoutWrapper}>
        <div css={styles.unitsColumn}>
          {units.map((unit, index) => (
            <LearningPathUnit
              key={unit.id}
              index={index}
              isLastUnit={index === (learningPath.units?.length ?? 0) - 1}
              unit={unit}
              learningPathId={learningPath.id!}
              isLearningPathCompleted={isCompleted}
              refetchGamesProgress={refetchGamesProgress}
            />
          ))}
        </div>
        <div css={styles.headerColumn}>
          {isCompleted && (
            <LearningPathCompletedCard/>
          )}
          <LearningPathHeader
            description={learningPath.description}
            estimatedDuration={learningPath.estimatedDuration}
            title={learningPath.title}
            totalTasks={totalTasks ?? 0}
          />
        </div>
      </div>
    </ContentWrapper>
  );
};
