import DashboardCasesBlockHeader from "@/components/molecules/dashboardCasesBlockHeader/DashboardCasesBlockHeader";
import DashboardCasesBlockTable from "@/components/molecules/dashboardCasesBlockTable/DashboardCasesBlockTable";

import React, { type FunctionComponent } from "react";

import * as styles from "./DashboardCasesBlock.styles";

const DashboardCasesBlock: FunctionComponent = () => (
  <div css={styles.wrapper}>
    <DashboardCasesBlockHeader/>
    <DashboardCasesBlockTable/>
  </div>
);

export default DashboardCasesBlock;
