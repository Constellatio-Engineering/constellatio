import { env } from "@/env.mjs";
import { api } from "@/utils/api";

import { type FunctionComponent, useCallback, useEffect, useRef } from "react";
import { useIdleTimer } from "react-idle-timer";

// TODO instead of directly checking if document.hasFocus() is false, check if the document had focus in the last 30 seconds or so

const firstNames = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eve",
  "Frank",
  "Grace",
  "Heidi",
  "Ivan",
  "Judy",
  "Kevin",
  "Laura",
  "Michael",
  "Nancy",
  "Oliver",
  "Patricia",
  "Quentin",
  "Rachel",
  "Steve",
  "Tina",
  "Ursula",
  "Victor",
  "Wendy",
  "Xander",
  "Yvonne",
  "Zach",
];

export const ActivityWatchdog: FunctionComponent = () =>
{
  const idRef = useRef<string>();

  const intervalRef = useRef<NodeJS.Timeout>();
  const { mutate: ping } = api.userActivity.ping.useMutation({
    onError: (error) => console.warn("Error while sending ping", error),
  });
  const { isIdle: getIsIdle } = useIdleTimer({
    timeout: 60_000
  });

  useEffect(() =>
  {
    // get a random first name
    const randomIndex = Math.floor(Math.random() * firstNames.length);
    const randomFirstName = firstNames[randomIndex];
    idRef.current = randomFirstName;
  }, []);

  const sendPing = useCallback((): void =>
  {
    if(!idRef.current)
    {
      return;
    }

    const isUserIdle = getIsIdle();
    const isTabActive = document.hasFocus();

    /* console.log("--- sendPing ---");

    if(isUserIdle)
    {
      console.log("User is idle");
      return;
    }

    if(!isTabActive)
    {
      console.log("Tab is not active");
      return;
    }*/

    const { href, pathname, search } = window.location;

    console.log("Sending ping");

    ping({
      data: {
        id: idRef.current,
        isTabActive,
        isUserIdle,
        visibilityState: document.visibilityState
      },
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

