import { type FunctionComponent } from "react";

import * as styles from "./ProfileReferralBlock.styles";
import ProfileReferralCardSection from "../profileReferralCardSection/ProfileReferralCardSection";
import ProfileReferralCodeSection from "../profileReferralCodeSection/ProfileReferralCodeSection";
import ProfileReferralExplanationSection from "../profileReferralExplanationSection/ProfileReferralExplanationSection";

const ProfileReferralBlock: FunctionComponent = () => 
{
  return (
    <div css={styles.wrapper}>
      <ProfileReferralExplanationSection/>
      <ProfileReferralCodeSection/>
      <ProfileReferralCardSection/>
    </div>
  );
};

export default ProfileReferralBlock;
