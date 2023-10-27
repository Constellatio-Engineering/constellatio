import React, { type FunctionComponent } from "react";

import * as styles from "./DashboardPage.styles";
import DashboardCasesBlock from "../dashboardCasesBlock/DashboardCasesBlock";
import DashboardHeader from "../dashboardHeader/DashboardHeader";
import DashboardPersonalSpaceBlock from "../dashboardPersonalSpaceBlock/DashboardPersonalSpaceBlock";
import SubscriptionModal from "../subscriptionModal/SubscriptionModal";

const DashboardPage: FunctionComponent = () => 
{

  return (
    <div css={styles.wrapper}>
      <DashboardHeader/>
      <div css={styles.sections}>
        <DashboardPersonalSpaceBlock/>
        <DashboardCasesBlock/>
      </div>
      <SubscriptionModal/>
    </div>
  );
};

export default DashboardPage;
