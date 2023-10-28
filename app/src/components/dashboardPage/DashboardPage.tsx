import useBadges from "@/hooks/useBadges";

import React, { type FunctionComponent } from "react";

import * as styles from "./DashboardPage.styles";
import DashboardCasesBlock from "../dashboardCasesBlock/DashboardCasesBlock";
import DashboardHeader from "../dashboardHeader/DashboardHeader";
import DashboardPersonalSpaceBlock from "../dashboardPersonalSpaceBlock/DashboardPersonalSpaceBlock";
import SubscriptionModal from "../subscriptionModal/SubscriptionModal";

const DashboardPage: FunctionComponent = () => 
{
  const { badges } = useBadges();

  /* badges.forEach(badge =>
  {
    if(badge.usersToBadges.length > 0)
    {
      console.log(badge.usersToBadges[0]!.user);
    }
  });

  console.log(badges);*/

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
