import { defaultLimit } from "@/components/pages/forumOverviewPage/ForumOverviewPage";
import { api } from "@/utils/api";

export const useNotificationDetails = (notificationId: string) =>
{
  const apiContext = api.useUtils();

  return api.notifications.getNotificationById.useQuery({ notificationId }, {
    initialData: () =>
    {
      // There seems to be a bug with the types where cursor is required for getInfiniteData, but it is not (taken from the docs)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const getNotificationsCacheData = apiContext.notifications.getNotifications.getInfiniteData({ limit: defaultLimit });
      const notificationsFromCache = getNotificationsCacheData?.pages.flatMap((page) => page?.notifications ?? []) ?? [];
      return notificationsFromCache.find((notification) => notification.id === notificationId);
    },
    retry: false,
    staleTime: Infinity
  });
};
