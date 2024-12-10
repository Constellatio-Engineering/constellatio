import DashboardLearningPathHeader from "@/components/molecules/dashboardLearningPathBlockHeader/DashboardLearningPathBlockHeader";
import LearningPathCarousel from "@/components/molecules/learningPathCarousel/LearningPathCarousel";
import LearningPathCarouselHead from "@/components/molecules/learningPathCarouselHead/LearningPathCarouselHead";
import { useLearningPathProgress } from "@/hooks/useLearningPathProgress";

import { type LearningPathWithExtraData } from "@constellatio/cms/utils/learningPaths";
import { type FunctionComponent } from "react";

import * as styles from "./DashboardLearningPathBlock.styles";

type Props = LearningPathWithExtraData;

const DashboardLearningPathBlock: FunctionComponent<Props> = (learningPath) =>
{
  const {
    completedUnitsCount,
    isCompleted,
    isPending,
    units
  } = useLearningPathProgress(learningPath);

  return (
    <div css={styles.wrapper}>
      <div css={styles.innerWrapper}>
        <DashboardLearningPathHeader {...learningPath} isCompleted={isCompleted}/>
        <div css={styles.carouselWrapper}>
          <LearningPathCarouselHead isLoading={isPending} completedCount={completedUnitsCount} totalCount={units.length}/>
          <LearningPathCarousel isLoading={isPending} learningPathId={learningPath.id} units={units}/>
        </div>
      </div>
    </div>
  );
};

export default DashboardLearningPathBlock;
