import BarChart from "@/components/molecules/barChart/BarChart";
import ProfileLearningTimeBlockHeader from "@/components/molecules/profileLearningTimeBlockHeader/ProfileLearningTimeBlockHeader";

import React, { type FunctionComponent } from "react";

import * as styles from "./LearninTimeCard.styles";

const LearninTimeCard: FunctionComponent = () => (
  <div css={styles.wrapper}>
    <ProfileLearningTimeBlockHeader selectedTab={0} tabs={[]}/>
    <BarChart chartType="days"/>
  </div>
);

// temporary disbale unused eslint rule until we are going to use this comp
// eslint-disable-next-line import/no-unused-modules
export default LearninTimeCard;
