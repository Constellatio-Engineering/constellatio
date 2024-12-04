import { type FunctionComponent } from "react";

import * as styles from "./DashboardLearningPathBlock.styles";
import DashboardLearningPathHeader from "@/components/molecules/dashboardLearningPathBlockHeader/DashboardLearningPathBlockHeader";
import LearningPathCarousel from "@/components/molecules/learningPathCarousel/LearningPathCarousel";
import LearningPathCarouselHead from "@/components/molecules/learningPathCarouselHead/LearningPathCarouselHead";

const DashboardLearningPathBlock: FunctionComponent = () => (
  <div css={styles.wrapper}>
    <div css={styles.innerWrapper}>
      <DashboardLearningPathHeader />
      <div css={styles.carouselWrapper}>
          <LearningPathCarouselHead/>
          <LearningPathCarousel />
        </div>
    </div>
  </div>
);

export default DashboardLearningPathBlock;
