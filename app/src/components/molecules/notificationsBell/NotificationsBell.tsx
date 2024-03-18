import { useNotifications } from "@/hooks/useNotifications";
import { type NotificationWithRelations } from "@/server/api/routers/notifications.router";
import { api } from "@/utils/api";

import React, { type FunctionComponent } from "react";

import * as styles from "./NotificationsBell.styles";

const getNotificationText = (notification: NotificationWithRelations[number]): string =>
{
  let message: string;

  console.log(notification);

  switch (notification.typeIdentifier)
  {
    case "answerToForumQuestionPosted":
    {
      message = `${notification.sender.displayName} hat eine Antwort auf deine Frage gepostet`;
      break;
    }
    case "forumQuestionPosted": { throw new Error("Not implemented yet: \"forumQuestionPosted\" case"); }
    case "forumQuestionUpvoted": { throw new Error("Not implemented yet: \"forumQuestionUpvoted\" case"); }
    case "replyToForumAnswerPosted": { throw new Error("Not implemented yet: \"replyToForumAnswerPosted\" case"); }
    case "forumAnswerUpvoted": { throw new Error("Not implemented yet: \"forumAnswerUpvoted\" case"); }
    case "forumAnswerAccepted": { throw new Error("Not implemented yet: \"forumAnswerAccepted\" case"); }
  }

  return message;
};

const NotificationsBell: FunctionComponent = () =>
{
  const { data: notifications } = useNotifications();

  console.log(notifications);
  console.log(notifications?.map(getNotificationText));

  return (
    <div css={styles.wrapper}>
      {notifications?.length}
    </div>
  );
};

export default NotificationsBell;
