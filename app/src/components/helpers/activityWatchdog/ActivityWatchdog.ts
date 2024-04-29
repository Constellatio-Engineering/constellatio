import { type FunctionComponent, useEffect, useRef } from "react";
import { useIdleTimer } from "react-idle-timer";

// eslint-disable-next-line @typescript-eslint/naming-convention
const IDLE_TIMEOUT = 10_000;

const ActivityWatchdog: FunctionComponent = () =>
{
  const intervalRef = useRef<NodeJS.Timeout>();

  const { isIdle: getIsIdle } = useIdleTimer({
    /* onAction: (event) =>
    {
      console.log(event?.type);
    },*/
    timeout: IDLE_TIMEOUT
  });

  /* useEffect(() =>
  {
    const interval = setInterval(() =>
    {
      const isIdle = getIsIdle();
      const isActive = !isIdle;
      console.log("is active: " + isActive.toString());
    }, 100);

    return () =>
    {
      clearInterval(interval);
    };
  }, [getIsIdle]);*/

  useEffect(() =>
  {
    if(intervalRef.current)
    {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() =>
    {
      const isUserIdle = getIsIdle();

      if(isUserIdle)
      {
        console.log("User is inactive");
        return;
      }

      console.log("PING");
    }, IDLE_TIMEOUT);

    return () =>
    {
      if(intervalRef.current)
      {
        clearInterval(intervalRef.current);
      }
    };
  }, [getIsIdle]);

  return null;
};

export default ActivityWatchdog;
