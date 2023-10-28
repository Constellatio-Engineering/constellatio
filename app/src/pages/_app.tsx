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
import Router from "next/router";
import Script from "next/script";
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
    // Enable debug mode in development
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") {
        posthog.debug();
      }
    },
    autocapture: false,
    //disable_persistence //? (default = false) Disable persisting user data across pages. This will disable cookies, session storage and local storage.
  });
}

const getCurrentTime = (): number => new Date().getTime();

type ConstellatioAppProps = AppProps<{ initialSession: Session }>;

const AppContainer: FunctionComponent<ConstellatioAppProps> = ({
  Component,
  pageProps,
  router,
}) => {
  const { mutate: ping, mutateAsync: pingAsync } =
    api.tracking.ping.useMutation();
  const isRouterReady = useIsRouterReady();
  const isProduction = env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT === "production";
  const [isDocumentVisible, setIsDocumentVisible] = useState<boolean>(true);
  const [isWindowInFocus, setIsWindowInFocus] = useState<boolean>(true);
  const interval = useRef<NodeJS.Timer>();

  let title = "Constellatio";

  if (!isProduction) {
    title += ` - ${env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT}`;
  }

  /* placeholder overlay feedback button */

  /* const router = useRouter() */
  useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog.capture("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    const onVisibilityChange = (): void => {
      setIsDocumentVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const onWindowBlur = (): void => {
      setIsWindowInFocus(false);
    };
    window.addEventListener("blur", onWindowBlur);
    return () => {
      window.addEventListener("blur", onWindowBlur);
    };
  }, []);

  useEffect(() => {
    const onWindowBlur = (): void => {
      setIsWindowInFocus(true);
    };
    window.addEventListener("focus", onWindowBlur);
    return () => {
      window.addEventListener("focus", onWindowBlur);
    };
  }, []);

  const onInterval = useCallback(() => {
    console.log("onInterval");
    /* || !isWindowInFocus könnte man auch noch einbinden*/
    if (!isDocumentVisible) {
      console.log("not visible or not in focus => return");
      return;
    }

    const path = router.asPath;
    ping({ url: path });
  }, [isDocumentVisible, ping, router.asPath]);

  useEffect(() => {
    if (interval.current) {
      clearInterval(interval.current);
    }

    onInterval(); //TODO::check feuert aktuell glaub 2x beim betreten

    interval.current = setInterval(onInterval, 10000);

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
