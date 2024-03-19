import UserProfilePicture from "@/components/molecules/userProfilePicture/UserProfilePicture";
import { useNotificationDetails } from "@/hooks/useNotificationDetails";
import { api } from "@/utils/api";

import Link from "next/link";
import React, { type FunctionComponent } from "react";

import * as styles from "./NotificationListItem.styles";

type Props = {
  readonly notificationId: string;
};

const NotificationListItem: FunctionComponent<Props> = ({ notificationId }) =>
{
  const apiUtils = api.useUtils();
  const { data: notification } = useNotificationDetails(notificationId);
  const { mutate: markNotificationAsSeen } = api.notifications.markNotificationAsSeen.useMutation({
    onError: () => console.log("onError"),
    onMutate: () => console.log("onMutate"),
    onSettled: () => console.log("onSettled"),
    onSuccess: async () => apiUtils.notifications.getAmountOfUnreadNotifications.invalidate(),
  });

  if(!notification)
  {
    return null;
  }

  const { frontendData, sender } = notification;

  return (
    <Link
      href={frontendData.link}
      key={notification.id}
      css={styles.notificationWrapper}
      onClick={() => markNotificationAsSeen({ notificationId })}>
      <div css={styles.header}>
        <div css={styles.userIconAndTitle}>
          <UserProfilePicture authorProfilePictureUrl={sender.profilePictureUrl}/>
          <strong css={styles.title}>{frontendData.title}</strong>
        </div>
        <span css={styles.date}>
          {notification.createdAt.toLocaleDateString("de", {
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
      <p>{frontendData.text}</p>
    </Link>
  );
};

export default NotificationListItem;
