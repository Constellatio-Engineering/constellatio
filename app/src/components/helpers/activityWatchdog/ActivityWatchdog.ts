import { env } from "@/env.mjs";
import { api } from "@/utils/api";

import { type FunctionComponent, useCallback, useEffect, useRef } from "react";
import { useIdleTimer } from "react-idle-timer";

export const ActivityWatchdog: FunctionComponent = () =>
{
  const intervalRef = useRef<NodeJS.Timeout>();
  const { mutate: ping } = api.userActivity.ping.useMutation();
  const { isIdle: getIsIdle } = useIdleTimer({
    timeout: 30_000
  });

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
