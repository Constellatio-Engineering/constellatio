import { useUserActivityStore } from "@/stores/userActivity.store";

import React, { type FunctionComponent, useEffect, useRef, useState } from "react";
import { useIdleTimer } from "react-idle-timer";

const ActivityWatchdog: FunctionComponent = () =>
{
  const { activityState, setUserIsActive, setUserIsInactive } = useUserActivityStore();
  const intervalRef = useRef<NodeJS.Timeout>();
  const [isTabActive, setIsTabActive] = useState(document.hasFocus());

  useEffect(() =>
  {
    window.onfocus = () => setIsTabActive(true);
    window.onblur = () => setIsTabActive(false);
  }, []);

  useEffect(() =>
  {
    if(document.hasFocus())
    {
      setIsTabActive(true);
    }
  }, []);

  useIdleTimer({
    crossTab: true,
    leaderElection: true,
    onActive: setUserIsActive,
    onIdle: setUserIsInactive,
    syncTimers: 200,
    timeout: 5_000
  });

  useEffect(() =>
  {
    if(intervalRef.current)
    {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() =>
    {
      const isUserActive = useUserActivityStore.getState().activityState === "active";

      if(!isTabActive)
      {
        console.log("Tab is inactive");
        return;
      }

      if(!isUserActive)
      {
        console.log("User is inactive");
        return;
      }

      console.log("PING");
    }, 3_000);

    return () =>
    {
      if(intervalRef.current)
      {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTabActive]);

  return (
    <div style={{ padding: 30 }}>
      <p style={{ fontSize: 40 }}>isTabActive: {isTabActive.toString()}</p>
      <p style={{ fontSize: 40 }}>{activityState}</p>
    </div>
  );

  return null;
};

export default ActivityWatchdog;
