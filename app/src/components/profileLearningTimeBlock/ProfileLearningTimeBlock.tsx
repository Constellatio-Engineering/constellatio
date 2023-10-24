import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileLearningTimeBlock.styles";
import BarChart from "../barChart/BarChart";
import ProfileLearningTimeBlockHeader from "../profileLearningTimeBlockHeader/ProfileLearningTimeBlockHeader";

const ProfileLearningTimeBlock: FunctionComponent = () => 
{
  const tabs = [{ title: "This week" }, { title: "This month" }, { title: "This year" }];
  return (
    <div css={styles.wrapper}>
      <ProfileLearningTimeBlockHeader selectedTab={0} tabs={tabs}/>
      <BarChart chartType="months"/>
    </div>
  );
};

export default ProfileLearningTimeBlock;
