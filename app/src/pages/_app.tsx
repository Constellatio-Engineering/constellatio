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
import { type Session, SessionContextProvider } from "@supabase/auth-helpers-react";
import { type AppProps } from "next/app";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import { type FunctionComponent } from "react";

type ConstellatioAppProps = AppProps<{ initialSession: Session }>;

const AppContainer: FunctionComponent<ConstellatioAppProps> = ({ Component, pageProps }) =>
{
  const isRouterReady = useIsRouterReady();
  const isProduction = env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT === "production";
  let title = "Constellatio";

  if(!isProduction)
  {
    title += ` - ${env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT}`;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="/favicon.png"/>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
      </Head>
      <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
        <InvalidateQueriesProvider>
          <AuthStateProvider>
            <CustomThemingProvider>
              <ModalsProvider>
                <MeilisearchProvider>
                  <RouterTransition/>
                  <Notifications/>
                  {isRouterReady ? (
                    <Component {...pageProps}/>
                  ) : <h1>Loading...</h1>}
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
