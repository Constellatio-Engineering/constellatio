import { NotificationsPageHeader } from "@/components/organisms/notificationsPageHeader/NotificationsPageHeader";
import Notifications from "@/components/pages/notificationsPage/notifications/Notifications";

import React, { type FunctionComponent } from "react";

import * as styles from "./NotificationsPage.styles";

export const NotificationsPage: FunctionComponent = () =>
{
  return (
    <div css={styles.wrapper}>
      <NotificationsPageHeader/>
      <Notifications/>
    </div>
  );
};
