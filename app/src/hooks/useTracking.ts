import { env } from "@/env.mjs";
import { supabase } from "@/lib/supabase";
import { isProduction, isTrackingEnabled } from "@/utils/env";
import { initFormbricks, resetFormbricks } from "@/utils/formbricks";

import { useRouter } from "next/router";
import { posthog } from "posthog-js";
import { useCallback, useEffect, useRef } from "react";

if(typeof window !== "undefined")
{
  if(isTrackingEnabled)
  {
    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
      autocapture: true,
      capture_pageview: true,
      disable_cookie: true,
      disable_session_recording: true,
      loaded: (posthog) =>
      {
        if(!isProduction)
        {
          posthog.debug(true);
        }
      },
      opt_out_capturing_by_default: true,
      opt_out_persistence_by_default: true,
      secure_cookie: true,
    });
  }

  else
  {
    posthog.init("invalide_token", {
      api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
      autocapture: false,
      capture_pageview: false,
      disable_cookie: true,
      disable_session_recording: true,
      loaded: (posthog) =>
      {
        if(!isProduction)
        {
          posthog.opt_out_capturing();
        }
      },
      opt_out_capturing_by_default: true,
      opt_out_persistence_by_default: true,
      secure_cookie: true,
    });
  }

  supabase.auth.onAuthStateChange(async (event, session) =>
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

        await initFormbricks(
          {
            apiHost: env.NEXT_PUBLIC_FORMBRICKS_HOST,
            debug: false,
            email,
            environmentId: isProduction
              ? env.NEXT_PUBLIC_FORMBRICKS_KEY_PRODUCTION
              : env.NEXT_PUBLIC_FORMBRICKS_KEY_TESTINGS,
            userId: id
          }
        );

        if(isTrackingEnabled)
        {
          posthog.set_config({
            disable_cookie: false,
            disable_persistence: false,
          });

          if(!posthog.has_opted_in_capturing())
          {
            posthog.opt_in_capturing();
            posthog.identify(id, { email });

            posthog._start_queue_if_opted_in();

            if(posthog.has_opted_in_capturing())
            {
              if(isProduction)
              {
                posthog.startSessionRecording();
              }
            }

          }
        }

        break;

      case "SIGNED_OUT": {

        await resetFormbricks();

        if(isTrackingEnabled)
        {
          posthog.stopSessionRecording();

          if(posthog.has_opted_in_capturing())
          {
            posthog.opt_out_capturing();
          }

          posthog.set_config({
            disable_cookie: true,
            disable_persistence: true,
          });

          posthog.reset(true);
        }

        break;
      }
      default:
        break;
    }
  });
}

export const useTracking = (): void =>
{
  const router = useRouter();
  const isDocumentVisibleRef = useRef<boolean | null>(null);

  const onRouteChange = useCallback((): void =>
  {
    posthog.capture("$pageview");
  }, []);

  const onVisibilityChange = useCallback((): void =>
  {
    const visibility = !document.hidden;

    if(isDocumentVisibleRef.current === visibility)
    {
      return;
    }

    isDocumentVisibleRef.current = visibility;
    posthog.capture(visibility ? "$visibilityOn" : "$visibilityOff");
  }, []);

  useEffect(() =>
  {
    if(!isTrackingEnabled)
    {
      return;
    }

    router.events.on("routeChangeComplete", onRouteChange);
    return () => router.events.off("routeChangeComplete", onRouteChange);
  }, [onRouteChange, router.events]);

  useEffect(() =>
  {
    if(!isTrackingEnabled)
    {
      return;
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [onVisibilityChange]);
};
