import { Title } from "@mantine/core";
import { type FunctionComponent } from "react";

import * as styles from "./ProfileReferral.styles";
import ProfileReferralBlock from "../profileReferralBlock/ProfileReferralBlock";

const ProfileOverview: FunctionComponent = () =>
{
  return (
    <div css={styles.wrapper}>
      <Title order={3} css={styles.title}>Freunde einladen</Title>
      <ProfileReferralBlock/>
    </div>
  );
};

export default ProfileOverview;
