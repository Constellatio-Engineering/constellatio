import { env } from "@/env.mjs";
import { api } from "@/utils/api";

import { type FunctionComponent, useCallback, useEffect, useRef } from "react";
import { useIdleTimer } from "react-idle-timer";

// TODO instead of directly checking if document.hasFocus() is false, check if the document had focus in the last 30 seconds or so

export const ActivityWatchdog: FunctionComponent = () =>
{
  const intervalRef = useRef<NodeJS.Timeout>();
  const { mutate: ping } = api.userActivity.ping.useMutation({
    onError: (error) => console.warn("Error while sending ping", error),
  });
  const { isIdle: getIsIdle } = useIdleTimer({
    timeout: 30_000
  });

  const { data: submittedPings } = api.userActivity.getUsageTime.useQuery(undefined, { refetchInterval: 3000 });

  useEffect(() =>
  {
    console.log(submittedPings);
  }, [submittedPings]);

  const sendPing = useCallback((): void =>
  {
    const isUserIdle = getIsIdle();
    const isTabActive = document.hasFocus();

    if(isUserIdle)
    {
      return;
    }

    if(!isTabActive)
    {
      return;
    }

    const { href, pathname, search } = window.location;

    ping({
      href,
      path: pathname,
      search: search === "" ? undefined : search,
    });
  }, [getIsIdle, ping]);

  useEffect(() =>
  {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(sendPing, env.NEXT_PUBLIC_USER_ACTIVITY_PING_INTERVAL_SECONDS * 1000);
    return () => clearInterval(intervalRef.current);
  }, [sendPing]);

  return null;
};

