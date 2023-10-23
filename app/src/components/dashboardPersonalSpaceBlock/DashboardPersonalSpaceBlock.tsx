import React, { type FunctionComponent } from "react";

import * as styles from "./DashboardPersonalSpaceBlock.styles";
import DashboardPersonalSpaceBlockHeader from "../dashboardPersonalSpaceBlockHeader/DashboardPersonalSpaceBlockHeader";

const DashboardPersonalSpaceBlock: FunctionComponent = () => (
  <div css={styles.wrapper}>
    <DashboardPersonalSpaceBlockHeader/>
  </div>
);

export default DashboardPersonalSpaceBlock;
