import DashboardLearningPathHeader from "@/components/molecules/dashboardLearningPathBlockHeader/DashboardLearningPathBlockHeader";
import LearningPathCarousel from "@/components/molecules/learningPathCarousel/LearningPathCarousel";
import LearningPathCarouselHead from "@/components/molecules/learningPathCarouselHead/LearningPathCarouselHead";

import type { IGenLearningPath } from "@constellatio/cms/generated-types";
import { type FunctionComponent } from "react";

import * as styles from "./DashboardLearningPathBlock.styles";

type Props = IGenLearningPath;

const DashboardLearningPathBlock: FunctionComponent<Props> = (learningPath) => (
  <div css={styles.wrapper}>
    <div css={styles.innerWrapper}>
      <DashboardLearningPathHeader {...learningPath}/>
      <div css={styles.carouselWrapper}>
        <LearningPathCarouselHead isLoading={false} completedCount={0} totalCount={learningPath.units?.length ?? 0}/>
        <LearningPathCarousel isLoading={false} {...learningPath}/>
      </div>
    </div>
  </div>
);

export default DashboardLearningPathBlock;
