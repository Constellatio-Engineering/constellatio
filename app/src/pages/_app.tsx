import { RouterTransition } from "@/components/atoms/RouterTransition/RouterTransition";
import { env } from "@/env.mjs";
import { supabase } from "@/lib/supabase";
import AuthStateProvider from "@/provider/AuthStateProvider";
import CustomThemingProvider from "@/provider/CustomThemingProvider";
import MeilisearchProvider from "@/provider/MeilisearchProvider";
import { api } from "@/utils/api";

import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { type Session, SessionContextProvider } from "@supabase/auth-helpers-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type AppProps } from "next/app";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import { type FunctionComponent } from "react";

const queryClient = new QueryClient();

type ConstellatioAppProps = AppProps<{ initialSession: Session }>;

const AppContainer: FunctionComponent<ConstellatioAppProps> = ({ Component, pageProps }) =>
{
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
      <QueryClientProvider client={queryClient}>
        <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
          <AuthStateProvider>
            <CustomThemingProvider>
              <ModalsProvider>
                <MeilisearchProvider>
                  <RouterTransition/>
                  <Notifications/>
                  <Component {...pageProps}/>
                </MeilisearchProvider>
              </ModalsProvider>
            </CustomThemingProvider>
          </AuthStateProvider>
        </SessionContextProvider>
      </QueryClientProvider>
    </>
  );
};

export default api.withTRPC(appWithTranslation(AppContainer));
