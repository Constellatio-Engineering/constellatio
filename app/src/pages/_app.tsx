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
import { type FunctionComponent, useEffect, useState } from "react";

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
  const isRouterReady = useIsRouterReady();
  const isProduction = env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT === "production";
  const [isDocumentVisible, setIsDocumentVisible] = useState<boolean>(false);

  let title = "Constellatio";

  if(!isProduction) 
  {
    title += ` - ${env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT}`;
  }

  const onVisibilityChange = (e: Event): void =>
  {
    console.log("visibility changed", e);
  };

  const onPageEnter = (): void =>
  {
    track({
      event: {
        eventId: "page-enter",
        eventTimestamp: getCurrentTime(),
      },
      url: "placeholder",
      userId: "userTestId",
    });
  };

  const onPageLeave = (): void =>
  {
    track({
      event: {
        eventId: "page-leave",
        eventTimestamp: getCurrentTime(),
      },
      url: "placeholder",
      userId: "userTestId",
    });
  };

  useEffect(() =>
  {
    document.addEventListener("visibilitychange", onVisibilityChange);
    document.addEventListener("routeChangeComplete", onPageEnter);
    window.addEventListener("beforeunload", onPageLeave);

    return () =>
    {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("routeChangeComplete", onPageEnter);
      window.removeEventListener("beforeunload", onPageLeave);
    };
  }, []);

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
