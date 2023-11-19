import DashboardCasesBlock from "@/components/organisms/dashboardCasesBlock/DashboardCasesBlock";
import DashboardHeader from "@/components/organisms/dashboardHeader/DashboardHeader";
import DashboardPersonalSpaceBlock from "@/components/organisms/dashboardPersonalSpaceBlock/DashboardPersonalSpaceBlock";

import React, { type FunctionComponent } from "react";

import * as styles from "./DashboardPage.styles";

const DashboardPage: FunctionComponent = () => (
  <div css={styles.wrapper}>
    <DashboardHeader/>
    <div css={styles.sections}>
      <DashboardPersonalSpaceBlock/>
      <DashboardCasesBlock/>
    </div>
  </div>
);

export default DashboardPage;
