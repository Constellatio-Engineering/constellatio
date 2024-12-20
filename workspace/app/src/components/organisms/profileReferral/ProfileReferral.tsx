import { type FunctionComponent } from "react";

import * as styles from "./ProfileReferral.styles";
import ProfileReferralBlock from "../profileReferralBlock/ProfileReferralBlock";

const ProfileOverview: FunctionComponent = () =>
{
  return (
    <div css={styles.wrapper}>
      <ProfileReferralBlock/>
    </div>
  );
};

export default ProfileOverview;
