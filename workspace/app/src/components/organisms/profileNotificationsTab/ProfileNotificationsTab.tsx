import { Title } from "@mantine/core";
import { type FunctionComponent } from "react";

import * as styles from "./ProfileNotificationsTab.styles";
import ProfileNotificationsTabForm from "../profileNotificationsTabForm/ProfileNotificationsTabForm";

const ProfileNotificationsTab: FunctionComponent = () => 
{

  return (
    <div css={styles.wrapper}>
      <Title css={styles.profileNotificationTabTitle} order={3}>Notifications</Title>
      <ProfileNotificationsTabForm/>
    </div>
  );
};

// eslint-disable-next-line import/no-unused-modules
export default ProfileNotificationsTab;
