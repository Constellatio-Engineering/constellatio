import { MarkChatRead } from "@/components/Icons/MarkChatRead";
import { MarkChatUnread } from "@/components/Icons/MarkChatUnread";
import { UnstyledButton } from "@/components/molecules/unstyledButton/UnstyledButton";
import UserProfilePicture from "@/components/molecules/userProfilePicture/UserProfilePicture";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { useNotificationDetails } from "@/hooks/useNotificationDetails";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { api } from "@/utils/api";

import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { type FunctionComponent } from "react";

import * as styles from "./NotificationListItem.styles";

type Props = {
  readonly notificationId: string;
};

const NotificationListItem: FunctionComponent<Props> = ({ notificationId }) =>
{
  const { invalidateAmountOfUnreadNotifications, invalidateNotification } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { data: notification, isFetching } = useNotificationDetails(notificationId);
  const {
    isPending: isSetNotificationReadStatusLoading,
    mutate: setNotificationSeenStatus
  } = api.notifications.setNotificationReadStatus.useMutation({
    onError: () =>
    {
      notifications.show({
        color: "red",
        message: "Da ist leider etwas schiefgelaufen.",
        title: "Fehler"
      });
    },
    onSuccess: async () =>
    {
      await invalidateNotification({ notificationId });
      await invalidateAmountOfUnreadNotifications();
    },
  });

  if(!notification)
  {
    return null;
  }

  const markNotificationAsRead = (): void =>
  {
    setNotificationSeenStatus({
      newStatus: "read",
      notificationId,
    });
  };

  const markNotificationAsUnread = (): void =>
  {
    setNotificationSeenStatus({
      newStatus: "not-read",
      notificationId,
    });
  };

  const { frontendData, readAt, sender } = notification;
  const isRead = readAt != null;

  return (
    <Link
      href={frontendData.link}
      key={notification.id}
      css={[styles.notificationWrapper, !isRead && styles.wrapperUnread]}
      onClick={markNotificationAsRead}>
      {!isRead && <div css={styles.unreadLeftBar}/>}
      <div css={styles.header}>
        <div css={styles.userIconAndTitle}>
          <UserProfilePicture authorProfilePictureUrl={sender.profilePictureUrl}/>
          <strong css={styles.title}>{frontendData.title}</strong>
        </div>
        <div css={styles.dateAndMarkReadWrapper}>
          <span css={styles.date}>
            {notification.createdAt.toLocaleDateString("de", {
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
          <UnstyledButton
            disabled={isSetNotificationReadStatusLoading || isFetching}
            onClick={(e) => 
            {
              e.stopPropagation();
              e.preventDefault();

              if(isRead)
              {
                markNotificationAsUnread();
              }
              else
              {
                markNotificationAsRead();
              }
            }}
            title={isRead ? "Als ungelesen markieren" : "Als gelesen markieren"}>
            <div css={styles.markRead}>
              {isRead ? <MarkChatUnread size={18}/> : <MarkChatRead size={18}/>}
            </div>
          </UnstyledButton>
        </div>
      </div>
      <p>{frontendData.text}</p>
    </Link>
  );
};

export default NotificationListItem;
