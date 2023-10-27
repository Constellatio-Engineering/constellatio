import { Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileNotificationsTab.styles";
import ProfileNotificationsTabForm from "../profileNotificationsTabForm/ProfileNotificationsTabForm";

const ProfileNotificationsTab: FunctionComponent = () => 
{
  const isTabletScreen = useMediaQuery("(max-width: 1100px)"); 

  return (
    <div css={styles.wrapper}>
      {!isTabletScreen && <Title order={3}>Notifications</Title>}
      <ProfileNotificationsTabForm/>
    </div>
  );
};

// eslint-disable-next-line import/no-unused-modules
export default ProfileNotificationsTab;
