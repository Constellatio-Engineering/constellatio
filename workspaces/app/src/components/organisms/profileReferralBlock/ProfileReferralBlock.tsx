import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileReferralBlock.styles";
import ProfileReferralCardSection from "../profileReferralCardSection/ProfileReferralCardSection";
import ProfileReferralCodeSection from "../profileReferralCodeSection/ProfileReferralCodeSection";

const ProfileReferralBlock: FunctionComponent = () => 
{
  return (
    <div css={styles.wrapper}>
      <ProfileReferralCodeSection/>
      <ProfileReferralCardSection/>
    </div>
  );
};

export default ProfileReferralBlock;
