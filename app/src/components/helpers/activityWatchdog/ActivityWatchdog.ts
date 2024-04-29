import { api } from "@/utils/api";

import { type FunctionComponent, useEffect, useRef } from "react";
import { useIdleTimer } from "react-idle-timer";
const ActivityWatchdog: FunctionComponent = () =>
{
  const intervalRef = useRef<NodeJS.Timeout>();
  const { isIdle: getIsIdle } = useIdleTimer({
    timeout: 30_000
  });

  const { mutate: ping } = api.userActivity.ping.useMutation();

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
    }, 10_000);

    return () =>
    {
      clearInterval(intervalRef.current);
    };
  }, [getIsIdle, ping]);

  return null;
};

export default ActivityWatchdog;
