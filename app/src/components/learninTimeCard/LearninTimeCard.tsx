import React, { type FunctionComponent } from "react";

import * as styles from "./LearninTimeCard.styles";
import BarChart from "../barChart/BarChart";
import ProfileLearningTimeBlockHeader from "../profileLearningTimeBlockHeader/ProfileLearningTimeBlockHeader";

const LearninTimeCard: FunctionComponent = () => (
  <div css={styles.wrapper}>
    <ProfileLearningTimeBlockHeader selectedTab={0} tabs={[]}/>
    <BarChart chartType="days"/>
  </div>
);

export default LearninTimeCard;
