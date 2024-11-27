import { pageSize } from "@/components/pages/forumOverviewPage/ForumOverviewPage";
import { api } from "@/utils/api";

import { type NotificationWithRelations } from "@constellatio/api/routers/notifications.router";
import { getForumQuestionUrl } from "@constellatio/shared/paths";

type NotificationFrontendData = {
  link: string;
  text: string;
  title: string;
};

const getNotificationFrontendData = (notification: NotificationWithRelations): NotificationFrontendData =>
{
  let data: NotificationFrontendData;

  switch (notification.typeIdentifier)
  {
    case "answerToForumQuestionPosted":
    {
      data = {
        link: getForumQuestionUrl({ id: notification.resourceId! }),
        text: `'${notification.sender.displayName}' hat eine Antwort auf deine Frage gepostet.`,
        title: "Neue Antwort",
      };
      break;
    }
    case "replyToForumAnswerPosted":
    {
      data = {
        link: getForumQuestionUrl({ id: notification.resourceId! }),
        text: `'${notification.sender.displayName}' hat auf deine Antwort geantwortet.`,
        title: "Neue Antwort",
      };
      break;
    }
    case "forumQuestionPosted": { throw new Error("Not implemented yet: \"forumQuestionPosted\" case"); }
    case "forumQuestionUpvoted": { throw new Error("Not implemented yet: \"forumQuestionUpvoted\" case"); }
    case "forumAnswerUpvoted": { throw new Error("Not implemented yet: \"forumAnswerUpvoted\" case"); }
    case "forumAnswerAccepted": { throw new Error("Not implemented yet: \"forumAnswerAccepted\" case"); }
  }

  return data;
};

export const useNotificationDetails = (notificationId: string) =>
{
  const apiContext = api.useUtils();

  return api.notifications.getNotificationById.useQuery({ notificationId }, {
    initialData: () =>
    {
      // There seems to be a bug with the types where cursor is required for getInfiniteData, but it is not (taken from the docs)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const getNotificationsCacheData = apiContext.notifications.getNotifications.getInfiniteData({ limit: pageSize });
      const notificationsFromCache = getNotificationsCacheData?.pages.flatMap((page) => page?.notifications ?? []) ?? [];
      return notificationsFromCache.find((notification) => notification.id === notificationId);
    },
    retry: false,
    select: (notification) =>
    {
      if(!notification)
      {
        return null;
      }

      return ({
        ...notification,
        frontendData: getNotificationFrontendData(notification),
      });
    },
    staleTime: Infinity
  });
};
