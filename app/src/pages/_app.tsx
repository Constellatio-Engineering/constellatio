import { RouterTransition } from "@/components/atoms/RouterTransition/RouterTransition";
import { env } from "@/env.mjs";
import { useIsRouterReady } from "@/hooks/useIsRouterReady";
import { supabase } from "@/lib/supabase";
import AuthStateProvider from "@/provider/AuthStateProvider";
import CustomThemingProvider from "@/provider/CustomThemingProvider";
import InvalidateQueriesProvider from "@/provider/InvalidateQueriesProvider";
import MeilisearchProvider from "@/provider/MeilisearchProvider";
import { api } from "@/utils/api";

import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import {
  type Session,
  SessionContextProvider,
} from "@supabase/auth-helpers-react";
import { type AppProps } from "next/app";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";

// new posthog stuff
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import React, {
  type FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

// Check that PostHog is client-side
if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
    secure_cookie: true,
    capture_pageview: false,

    opt_out_capturing_by_default: true,
    opt_out_persistence_by_default: true,
    disable_cookie: true,
    disable_persistence: true,
    autocapture: true,
    disable_session_recording: true,

    loaded: (posthog) => {
      // Enable debug mode in development
      if (process.env.NODE_ENV === "development") {
        posthog.debug(true);
      }
    },
  });
}

type ConstellatioAppProps = AppProps<{ initialSession: Session }>;

const AppContainer: FunctionComponent<ConstellatioAppProps> = ({
  Component,
  pageProps,
  router,
}) => {
  const { mutate: ping } = api.tracking.ping.useMutation();
  const isRouterReady = useIsRouterReady();
  const isProduction = env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT === "production";
  const [isDocumentVisible, setIsDocumentVisible] = useState<null | boolean>(
    null
  );

  const [isMouseInWindow, setIsMouseInWindow] = useState<null | boolean>(null);
  const interval = useRef<NodeJS.Timer>();

  let title = "Constellatio";

  if (!isProduction) {
    title += ` - ${env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT}`;
  }

  /* TODO:: placeholder overlay feedback button */

  useEffect(() => {
    const handleRouteChange = () => posthog.capture("$pageview");

    supabase.auth.onAuthStateChange((event, session) => {
      //"INITIAL_SESSION" | "SIGNED_IN" | "SIGNED_OUT .. UPDATED etc vlt. noch ergänzen."
      switch (event) {
        case "SIGNED_IN": {
          const id = session?.user?.id;
          const email = session?.user?.email;
          posthog.identify(id, { email: email });
          posthog.opt_in_capturing();
          break;
        }
        case "SIGNED_OUT": {
          posthog.opt_out_capturing();
          posthog.reset();
        }
      }

      if (posthog.has_opted_in_capturing()) {
        //TODO::development => production noch ändern
        //TODO::remove process. => env.NODE_ENV => type error
        if (process.env.NODE_ENV != "production") {
          posthog.set_config({
            disable_cookie: false,
            disable_persistence: false,
            autocapture: true,
          });
          posthog.startSessionRecording();
        }
        router.events.on("routeChangeComplete", handleRouteChange);
      }
    });

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router, posthog]);

  useEffect(() => {
    const onVisibilityChange = (): void => {
      setIsDocumentVisible(!document.hidden);
    };
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const onWindowMouseOut = (): void => {
      setIsMouseInWindow(false);
    };

    const onWindowMouseOver = (): void => {
      setIsMouseInWindow(true);
    };

    document.addEventListener("mouseleave", onWindowMouseOut);
    document.addEventListener("mouseenter", onWindowMouseOver);

    return () => {
      document.removeEventListener("mouseleave", onWindowMouseOut);
      document.removeEventListener("mouseenter", onWindowMouseOver);
    };
  }, []);

  const onInterval = useCallback(() => {
    if (
      !isDocumentVisible ||
      !isMouseInWindow ||
      !posthog.has_opted_in_capturing() ||
      posthog.has_opted_out_capturing()
    ) {
      return;
    }

    const path = router.asPath;
    ping({ url: path });
  }, [isDocumentVisible, isMouseInWindow, posthog, router.asPath, ping]);

  useEffect(() => {
    if (interval.current) {
      clearInterval(interval.current);
    }

    onInterval(); //TODO::check feuert aktuell glaub 2x beim betreten

    interval.current = setInterval(onInterval, 5000);

    return () => clearInterval(interval.current);
  }, [onInterval]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <PostHogProvider client={posthog}>
          <InvalidateQueriesProvider>
            <AuthStateProvider>
              <CustomThemingProvider>
                <ModalsProvider>
                  <MeilisearchProvider>
                    <RouterTransition />
                    <Notifications />
                    {isRouterReady && <Component {...pageProps} />}
                  </MeilisearchProvider>
                </ModalsProvider>
              </CustomThemingProvider>
            </AuthStateProvider>
          </InvalidateQueriesProvider>
        </PostHogProvider>
      </SessionContextProvider>
    </>
  );
};

export default api.withTRPC(appWithTranslation(AppContainer));
