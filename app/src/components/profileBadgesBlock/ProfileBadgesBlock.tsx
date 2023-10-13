import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileBadgesBlock.styles";
import ProfileBadgesBlockHead from "../profileBadgesBlockHead/ProfileBadgesBlockHead";
import ProfileBadgesBlockList from "../profileBadgesBlockList/ProfileBadgesBlockList";

const ProfileBadgesBlock: FunctionComponent = () => 
{
  return (
    <div css={styles.wrapper}>
      <ProfileBadgesBlockHead/>
      <ProfileBadgesBlockList/>
    </div>
  );
};

export default ProfileBadgesBlock;
