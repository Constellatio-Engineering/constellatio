import { type NotificationWithRelations } from "@/server/api/routers/notifications.router";

import React, { type FunctionComponent } from "react";

import * as styles from "./NotificationText.styles";

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

type Props = NotificationWithRelations[number];

const NotificationText: FunctionComponent<Props> = (notification) =>
{
  const text = getNotificationText(notification);

  return (
    <div css={styles.wrapper}>
      {text}
    </div>
  );
};

export default NotificationText;
