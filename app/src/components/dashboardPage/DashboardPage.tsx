import React, { type FunctionComponent } from "react";

import * as styles from "./DashboardPage.styles";
import DashboardHeader from "../dashboardHeader/DashboardHeader";
import DashboardPersonalSpaceBlock from "../dashboardPersonalSpaceBlock/DashboardPersonalSpaceBlock";

const DashboardPage: FunctionComponent = () => (
  <div css={styles.wrapper}>
    {/* <Title order={3}>Dashboard</Title> */}
    <DashboardHeader/>
    <div css={styles.sections}><DashboardPersonalSpaceBlock/></div>
  </div>
);

export default DashboardPage;
