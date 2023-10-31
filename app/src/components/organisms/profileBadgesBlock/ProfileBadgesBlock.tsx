import BadgesDrawer from "@/components/badgesDrawer/BadgesDrawer";
import ProfileBadgesBlockHead from "@/components/molecules/profileBadgesBlockHead/ProfileBadgesBlockHead";
import ProfileBadgesBlockList from "@/components/molecules/profileBadgesBlockList/ProfileBadgesBlockList";

import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileBadgesBlock.styles";

const ProfileBadgesBlock: FunctionComponent = () => 
{
  return (
    <div css={styles.wrapper}>
      <ProfileBadgesBlockHead/>
      <ProfileBadgesBlockList/>
      <BadgesDrawer/>
    </div>
  );
};

export default ProfileBadgesBlock;
