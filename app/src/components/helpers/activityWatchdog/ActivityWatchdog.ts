import { env } from "@/env.mjs";
import { api } from "@/utils/api";

import { type FunctionComponent, useCallback, useEffect, useRef } from "react";
import { useIdleTimer } from "react-idle-timer";

export const ActivityWatchdog: FunctionComponent = () =>
{
  const documentLastVisibleTimestamp = useRef<number>();
  const intervalRef = useRef<NodeJS.Timeout>();
  const { mutate: ping } = api.userActivity.ping.useMutation({
    onError: (error) => console.warn("Error while sending ping", error),
  });
  const { isIdle: getIsIdle } = useIdleTimer({
    timeout: 60_000
  });

  const sendPing = useCallback((): void =>
  {
    console.log("--- sendPing ---");

    const now = Date.now();
    const isUserIdle = getIsIdle();
    const isDocumentVisible = document.visibilityState === "visible";

    if(isDocumentVisible)
    {
      documentLastVisibleTimestamp.current = now;
    }

    const wasDocumentVisibleInTheLast60Seconds = documentLastVisibleTimestamp.current && (now - documentLastVisibleTimestamp.current < 60_000);

    if(isUserIdle)
    {
      console.log("User is idle - not sending ping");
      return;
    }

    if(!wasDocumentVisibleInTheLast60Seconds)
    {
      console.log("document was not visible in the last 60 seconds - not sending ping");
      return;
    }

    const { href, pathname, search } = window.location;

    console.log("Sending ping");

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

