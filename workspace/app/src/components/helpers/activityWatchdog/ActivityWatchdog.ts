import { api } from "@/utils/api";

import { env } from "@constellatio/env";
import { type FunctionComponent, useCallback, useEffect, useRef } from "react";
import { useIdleTimer } from "react-idle-timer";

export const ActivityWatchdog: FunctionComponent = () =>
{
  const intervalRef = useRef<NodeJS.Timeout>();
  const { mutate: ping } = api.userActivity.ping.useMutation({
    onError: (error) => console.warn("Error while sending ping", error),
  });
  const { isIdle: getIsIdle } = useIdleTimer({
    timeout: 60_000
  });

  const sendPing = useCallback((): void =>
  {
    const isUserIdle = getIsIdle();
    const isDocumentVisible = document.visibilityState === "visible";

    if(isUserIdle)
    {
      return;
    }

    if(!isDocumentVisible)
    {
      return;
    }

    const { href, pathname, search } = window.location;

    ping({
      href,
      path: pathname,
      search: search === "" ? undefined : search,
      timeZoneOffset: new Date().getTimezoneOffset(),
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

