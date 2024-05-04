import ProfileLearningTimeBlockHeader from "@/components/molecules/profileLearningTimeBlockHeader/ProfileLearningTimeBlockHeader";
import { Chart } from "@/components/organisms/learninTimeCard/Chart";

import React, { type FunctionComponent } from "react";

import * as styles from "./LearninTimeCard.styles";

const LearninTimeCard: FunctionComponent = () => (
  <div css={styles.wrapper}>
    <ProfileLearningTimeBlockHeader selectedTab={0} tabs={[]}/>
    {/* <BarChart chartType="days"/>*/}
    <Chart/>
  </div>
);

// temporary disbale unused eslint rule until we are going to use this comp
// eslint-disable-next-line import/no-unused-modules
export default LearninTimeCard;
