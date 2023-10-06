import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileNotificationsTab.styles";
import ProfileNotificationsTabForm from "../profileNotificationsTabForm/ProfileNotificationsTabForm";

const ProfileNotificationsTab: FunctionComponent = () => 
{
  return (
    <div css={styles.wrapper}>
      <Title order={3}>Notifications</Title>
      <ProfileNotificationsTabForm/>
    </div>
  );
};

export default ProfileNotificationsTab;
