/* eslint-disable max-lines */
import { env } from "@/env.mjs";
import { supabase } from "@/lib/supabase";
import { getIsUserLoggedIn } from "@/utils/auth";
import { isProduction, isTrackingEnabled } from "@/utils/env";

import { useRouter } from "next/router";
import { type PostHogConfig, posthog } from "posthog-js";
import { type PostHog } from "posthog-js/react";
import { useCallback, useEffect, useRef } from "react";

type PageleaveProps = {
  pathname: string;
  url: string;
};

const configTrackingEnabled: Partial<PostHogConfig> = {
  api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
  loaded: (posthog: PostHog) =>
  {
    if(!isProduction)
    {
      posthog.debug(true);
    }
  },
  persistence: "localStorage+cookie",
  secure_cookie: true,
};

const posthogConfigLoggedIn: Partial<PostHogConfig> = {
  autocapture: true,
  capture_pageleave: true,
  capture_pageview: true,
  disable_persistence: false,
  disable_session_recording: false,
  opt_out_capturing_by_default: false,
  opt_out_persistence_by_default: false,
  session_idle_timeout_seconds: 20,
};

const posthogConfigLoggedOut: Partial<PostHogConfig> = {
  autocapture: false,
  capture_pageleave: true,
  capture_pageview: true,
  disable_persistence: true,
  disable_session_recording: true,
  enable_recording_console_log: false,
  opt_out_capturing_by_default: true,
  opt_out_persistence_by_default: true,
};

const configTrackingDisabled: Partial<PostHogConfig> = {
  ...posthogConfigLoggedOut,
  api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
  loaded: (posthog: PostHog) =>
  {
    if(!isProduction)
    {
      posthog.opt_out_capturing();
    }
  },
  persistence: "memory",
  secure_cookie: true,
};

const setPosthogConfig = (state: "loggedIn" | "loggedOut"): void => 
{
  switch (state)
  {
    case "loggedIn":  
      posthog.set_config(posthogConfigLoggedIn);
      break;

    case "loggedOut":
      posthog.set_config(posthogConfigLoggedOut);
      break;
  }
};

if(typeof window !== "undefined")
{

  if(isTrackingEnabled)
  {
    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, 
      {
        ...configTrackingEnabled,
        ...posthogConfigLoggedOut
      });
  }
  else 
  {
    posthog.init("invalide_token", { ...configTrackingDisabled });
  }

  supabase.auth.onAuthStateChange((event, session) =>
  {
    switch (event)
    {
      case "INITIAL_SESSION":
      case "SIGNED_IN":
        const id = session?.user?.id;
        const email = session?.user?.email;

        if(!id || !email)
        {
          return;
        }

        if(isTrackingEnabled)
        {
          setPosthogConfig("loggedIn");

          if(!posthog.has_opted_in_capturing())
          {
            posthog.opt_in_capturing();
          }
          
          const distinctIdPosthog = posthog.get_distinct_id();
          if(distinctIdPosthog !== id)
          {
            posthog.identify(id, { email });
          }

          posthog._start_queue_if_opted_in();
         
          if(isProduction)
          {
            posthog.startSessionRecording();
          }
        }
        break;

      case "SIGNED_OUT": 
        if(isTrackingEnabled)
        {
          if(posthog.has_opted_in_capturing())
          {
            posthog.opt_out_capturing({
              clear_persistence: true,
            });
          }
          if(posthog.sessionRecordingStarted())
          {
            posthog.stopSessionRecording();  
          }

          setPosthogConfig("loggedOut");
          posthog.reset();
        }
        break;
      
      default:
        break;
    }
  });
}

export const useTracking = (): void =>
{

  const router = useRouter();
  const firstRendering = useRef<boolean>(true);

  const pageleavePropsRef = useRef<PageleaveProps | null>(null);
  const isDocumentVisibleRef = useRef<boolean | null>(null);

  const onVisibilityChange = useCallback(async (): Promise<void> =>
  {
    if(isTrackingEnabled)
    {
      const getIsUserLoggedInResult = await getIsUserLoggedIn(supabase);

      if(getIsUserLoggedInResult.isUserLoggedIn)
      {
        const distinctIdPosthog = posthog.get_distinct_id();
        const { email, id } = getIsUserLoggedInResult.user;
  
        if(distinctIdPosthog !== id)
        {          
          posthog.identify(id, { email });
        }
      }
    } 

    const visibility = !document.hidden;

    if(isDocumentVisibleRef.current === visibility)
    {
      return;
    }

    isDocumentVisibleRef.current = visibility;
 
    posthog.capture(visibility ? "$visibilityOn" : "$visibilityOff", {},
      { 
        transport: "sendBeacon" 
      });
  }, []);

  useEffect(() =>
  {
    if(!isTrackingEnabled)
    {
      return () => {};
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [onVisibilityChange]);

  useEffect(() =>
  {
    if(!isTrackingEnabled) 
    {
      return () => {};
    }
    
    const onRouteChange = (): void =>
    {
      pageleavePropsRef.current = null;
      posthog.capture("$pageview");
    };

    router.events.on("routeChangeComplete", onRouteChange);
    return () => 
    {
      router.events.off("routeChangeComplete", onRouteChange);
    };

  }, [router.events]);
  
  useEffect(() => 
  {
    if(!isTrackingEnabled) 
    {
      return () => {};
    }

    const onRouteChangeStart = (): void => 
    {
      const fullUrl = `${window.location.origin}${router.asPath}`;
      
      if(!pageleavePropsRef.current) 
      {
        pageleavePropsRef.current = {
          pathname: router.asPath,
          url: fullUrl,
        };
      }
    };

    router.events.on("routeChangeStart", onRouteChangeStart);
  
    return () => 
    {
      router.events.off("routeChangeStart", onRouteChangeStart);
    };
  }, [router.asPath, router.events]);

  useEffect(() => 
  {
    if(!isTrackingEnabled) 
    {
      return () => {};
    }
  
    const onBeforeHistoryChange = (): void => 
    {
      if(!firstRendering.current) 
      {
        posthog.capture("$pageleave", 
          { 
            $current_url: pageleavePropsRef.current?.url, 
            $pathname: pageleavePropsRef.current?.pathname 
          }, 
          { 
            transport: "sendBeacon" 
          });
      }
      else 
      {
        firstRendering.current = false;
      }
    };
  
    router.events.on("beforeHistoryChange", onBeforeHistoryChange);
  
    return () => 
    {
      router.events.off("beforeHistoryChange", onBeforeHistoryChange);
    };
  }, [router.events, router.pathname]);
};
