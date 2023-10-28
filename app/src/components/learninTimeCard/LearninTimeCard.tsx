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

// temporary disbale unused eslint rule until we are going to use this comp
// eslint-disable-next-line import/no-unused-modules
export default LearninTimeCard;
