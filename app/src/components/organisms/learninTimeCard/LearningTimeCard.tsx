import ProfileLearningTimeBlockHeader from "@/components/molecules/profileLearningTimeBlockHeader/ProfileLearningTimeBlockHeader";
import { Chart } from "@/components/organisms/learninTimeCard/Chart";

import React, { type FunctionComponent } from "react";

import * as styles from "./LearninTimeCard.styles";

export const LearningTimeCard: FunctionComponent = () => (
  <div css={styles.wrapper}>
    <ProfileLearningTimeBlockHeader
      todaysLearningTime={{
        hours: 2,
        minutes: 30
      }}
    />
    <Chart/>
  </div>
);
