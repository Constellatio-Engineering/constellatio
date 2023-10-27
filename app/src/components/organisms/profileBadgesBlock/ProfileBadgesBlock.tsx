import BadgesDrawer from "@/components/badgesDrawer/BadgesDrawer";
import ProfileBadgesBlockHead from "@/components/molecules/profileBadgesBlockHead/ProfileBadgesBlockHead";
import ProfileBadgesBlockList from "@/components/molecules/profileBadgesBlockList/ProfileBadgesBlockList";
import useDashboardPageStore from "@/stores/dashboardPage.store";

import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileBadgesBlock.styles";

const ProfileBadgesBlock: FunctionComponent = () => 
{
  const isBadgesDrawerOpened = useDashboardPageStore(s => s.isBadgesDrawerOpened);
  const setIsBadgesDrawerOpened = useDashboardPageStore(s => s.setIsBadgesDrawerOpened);
  return (
    <div css={styles.wrapper}>
      <ProfileBadgesBlockHead/>
      <ProfileBadgesBlockList/>
      <BadgesDrawer close={() => setIsBadgesDrawerOpened(false)} opened={isBadgesDrawerOpened}/>

    </div>
  );
};

export default ProfileBadgesBlock;
