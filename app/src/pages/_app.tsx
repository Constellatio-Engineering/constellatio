import { RouterTransition } from "@/components/atoms/RouterTransition/RouterTransition";
import { env } from "@/env.mjs";
import { useIsRouterReady } from "@/hooks/useIsRouterReady";
import { supabase } from "@/lib/supabase";
import AuthStateProvider from "@/provider/AuthStateProvider";
import CustomThemingProvider from "@/provider/CustomThemingProvider";
import InvalidateQueriesProvider from "@/provider/InvalidateQueriesProvider";
import MeilisearchProvider from "@/provider/MeilisearchProvider";
import { api } from "@/utils/api";
import { track } from "@/utils/tracking";

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
  type FunctionComponent, useCallback, useEffect, useRef, useState 
} from "react";

// new for GA4

// Check that PostHog is client-side
if(typeof window !== "undefined") 
{
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
    // Enable debug mode in development
    loaded: (posthog) => 
    {
      if(process.env.NODE_ENV === "development") 
      {
        posthog.debug();
      }
    },
  });
}

const getCurrentTime = (): number => new Date().getTime();

type ConstellatioAppProps = AppProps<{ initialSession: Session }>;

const AppContainer: FunctionComponent<ConstellatioAppProps> = ({ Component, pageProps, router }) =>
{
  const { mutate: ping, mutateAsync: pingAsync } = api.tracking.ping.useMutation();
  const isRouterReady = useIsRouterReady();
  const isProduction = env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT === "production";
  const [isDocumentVisible, setIsDocumentVisible] = useState<boolean>(true);
  const interval = useRef<NodeJS.Timer>();

  let title = "Constellatio";

  if(!isProduction) 
  {
    title += ` - ${env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT}`;
  }

  useEffect(() => 
  {
    const onVisibilityChange = (e): void =>
    {
      console.log("visibility change", e);
      setIsDocumentVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => 
    {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const onInterval = useCallback(() =>
  {
    console.log("onInterval");

    if(!isDocumentVisible)
    {
      console.log("not visible, return");
      return;
    }

    const path = router.asPath;
    console.log("1", router.query.toString());
    console.log("2", new URLSearchParams(router.query).toString());
    const queryString = new URLSearchParams(router.query).toString();
    const fullURL = `${path}${queryString ? `?${queryString}` : ""}`;

    ping({ url: "http://localhost:8080" });

  }, [isDocumentVisible, ping, router.asPath, router.query]);

  useEffect(() =>
  {
    if(interval.current)
    {
      clearInterval(interval.current);
    }

    onInterval();

    interval.current = setInterval(onInterval, 10000);

    return () => clearInterval(interval.current);

  }, [onInterval]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="/favicon.png"/>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}>
        <InvalidateQueriesProvider>
          <AuthStateProvider>
            <CustomThemingProvider>
              <ModalsProvider>
                <MeilisearchProvider>
                  <RouterTransition/>
                  <Notifications/>
                  {isRouterReady && <Component {...pageProps}/>}
                </MeilisearchProvider>
              </ModalsProvider>
            </CustomThemingProvider>
          </AuthStateProvider>
        </InvalidateQueriesProvider>
      </SessionContextProvider>
    </>
  );
};

export default api.withTRPC(appWithTranslation(AppContainer));
