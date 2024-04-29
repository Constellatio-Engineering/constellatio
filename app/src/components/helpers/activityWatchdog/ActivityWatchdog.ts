import { env } from "@/env.mjs";
import { api } from "@/utils/api";

import { type FunctionComponent, useEffect, useRef } from "react";
import { useIdleTimer } from "react-idle-timer";

const ActivityWatchdog: FunctionComponent = () =>
{
  const intervalRef = useRef<NodeJS.Timeout>();
  const { isIdle: getIsIdle } = useIdleTimer({
    timeout: 30_000
  });

  const { mutate: ping } = api.userActivity.ping.useMutation({
    onError: (error) => console.error("error while pinging", error),
    onSuccess: () => console.log("pinged successfully"),
  });

  useEffect(() =>
  {
    if(intervalRef.current)
    {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() =>
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

      ping();
    }, env.NEXT_PUBLIC_USER_ACTIVITY_PING_INTERVAL_SECONDS * 1000);

    return () =>
    {
      clearInterval(intervalRef.current);
    };
  }, [getIsIdle, ping]);

  return null;
};

export default ActivityWatchdog;
