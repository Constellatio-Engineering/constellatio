import React, { type FunctionComponent } from "react";

import * as styles from "./DashboardCasesBlock.styles";
import DashboardCasesBlockHeader from "../dashboardCasesBlockHeader/DashboardCasesBlockHeader";
import DashboardCasesBlockTable from "../dashboardCasesBlockTable/DashboardCasesBlockTable";

const DashboardCasesBlock: FunctionComponent = () => (
  <div css={styles.wrapper}>
    <DashboardCasesBlockHeader/>
    <DashboardCasesBlockTable/>
  </div>
);

export default DashboardCasesBlock;
