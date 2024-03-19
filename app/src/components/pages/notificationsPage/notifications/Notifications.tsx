import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import NotificationListItem from "@/components/organisms/notificationListItem/NotificationListItem";
import { NotificationText } from "@/components/organisms/notificationText/NotificationText";
import { defaultLimit } from "@/components/pages/forumOverviewPage/ForumOverviewPage";
import { api } from "@/utils/api";

import React, { Fragment, type FunctionComponent, useEffect, useMemo } from "react";
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
    limit: defaultLimit,
  }, {
    getNextPageParam: (previouslyFetchedPage) =>
    {
      const nextCursor = previouslyFetchedPage?.nextCursor;

      if(nextCursor == null)
      {
        // backend returned no cursor, we're at the end of the list
        return null;
      }

      return nextCursor;
    },
    initialCursor: { index: null },
    refetchInterval: 5 * 1000,
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: Infinity
  });

  console.log(notificationsQuery);

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
