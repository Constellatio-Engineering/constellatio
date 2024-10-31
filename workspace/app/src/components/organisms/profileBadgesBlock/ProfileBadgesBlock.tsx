import ProfileBadgesBlockHead from "@/components/molecules/profileBadgesBlockHead/ProfileBadgesBlockHead";
import ProfileBadgesBlockList from "@/components/molecules/profileBadgesBlockList/ProfileBadgesBlockList";

import { type FunctionComponent } from "react";

import * as styles from "./ProfileBadgesBlock.styles";
import BadgesDrawer from "../badgesDrawer/BadgesDrawer";

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
