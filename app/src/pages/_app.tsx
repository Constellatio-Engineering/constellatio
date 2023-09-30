import { RouterTransition } from "@/components/atoms/RouterTransition/RouterTransition";
import AuthStateProvider from "@/provider/AuthStateProvider";
import CustomThemingProvider from "@/provider/CustomThemingProvider";
import MeilisearchProvider from "@/provider/MeilisearchProvider";
import { api } from "@/utils/api";

import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { type Session, SessionContextProvider } from "@supabase/auth-helpers-react";
import { type AppProps } from "next/app";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import { type FunctionComponent, useState } from "react";

type ConstellatioAppProps = AppProps<{ initialSession: Session }>;

const AppContainer: FunctionComponent<ConstellatioAppProps> = ({ Component, pageProps }) =>
{
  // This is taken from the docs
  // eslint-disable-next-line react/hook-use-state
  const [supabase] = useState(() => createPagesBrowserClient());

  return (
    <>
      <Head>
        <title>Constellatio</title>
        <link rel="shortcut icon" href="/favicon.png"/>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
      </Head>
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
    </>
  );
};

export default api.withTRPC(appWithTranslation(AppContainer));
