import ProfilePageHeader from "@/components/profilePageHeader/ProfilePageHeader";

import React, { type FunctionComponent } from "react";

import * as styles from "./ProfilePage.styles";

const ProfilePage: FunctionComponent = () =>
{
  return (
    <div css={styles.wrapper}>
      <ProfilePageHeader/>
    </div>
  );
};

export default ProfilePage;
