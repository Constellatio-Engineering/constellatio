import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import NotificationListItem from "@/components/organisms/notificationListItem/NotificationListItem";
import { pageSize } from "@/components/pages/forumOverviewPage/ForumOverviewPage";
import { api } from "@/utils/api";

import { Fragment, type FunctionComponent, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import * as styles from "./Notifications.styles";

const NotificationsEmptyStateCard: FunctionComponent = () =>
{
  return (
    <EmptyStateCard
      title={"Du hast noch keine Benachrichtigungen"}
      variant={"For-large-areas"}
    />
  );
};

const Notifications: FunctionComponent = () =>
{
  const { inView: isEndOfListInView, ref: endOfListLabelRef } = useInView({
    initialInView: false,
    rootMargin: "30% 0px 30%",
    threshold: 0,
    triggerOnce: false,
  });

  const {
    data: notificationsQuery,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    status,
  } = api.notifications.getNotifications.useInfiniteQuery({
    pageSize,
  }, {
    getNextPageParam: ((previouslyFetchedPage) => previouslyFetchedPage?.nextCursor),
    initialCursor: null,
    refetchOnMount: "always",
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: Infinity
  });

  const notifications = useMemo(() =>
  {
    return notificationsQuery?.pages.flatMap((page) => page?.notifications ?? []) ?? [];
  }, [notificationsQuery?.pages]);

  const loadedNotificationsLength = notifications.length;

  useEffect(() =>
  {
    if(isEndOfListInView)
    {
      void fetchNextPage();
    }
  }, [fetchNextPage, isEndOfListInView, loadedNotificationsLength]);

  return (
    <div css={styles.notificationsWrapper}>
      {(isPending) ? (
        <p>Lädt...</p>
      ) : status === "error" ? (
        <p>Error: {error.message}</p>
      ) : notifications.length > 0 ? (
        <Fragment>
          {notifications.map((notification) => (
            <NotificationListItem
              key={notification.id}
              notificationId={notification.id}
            />
          ))}
          {isFetchingNextPage && (
            <p>Lädt...</p>
          )}
          <p
            ref={endOfListLabelRef}
            css={[
              styles.endOfListReached,
              (!hasNextPage && !isFetchingNextPage) && styles.endOfListReachedVisible
            ]}>
            Es gibt keine weiteren Benachrichtigungen
          </p>
        </Fragment>
      ) : (
        <NotificationsEmptyStateCard/>
      )}
    </div>
  );
};

export default Notifications;
