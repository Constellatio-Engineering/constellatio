import { RouterTransition } from "@/components/atoms/RouterTransition/RouterTransition";
import CustomThemingProvider from "@/provider/CustomThemingProvider";
import MeilisearchProvider from "@/provider/MeilisearchProvider";
import { supabase } from "@/supabase/client";
import { api } from "@/utils/api";

import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { type Session, SessionContextProvider } from "@supabase/auth-helpers-react";
import { type AppProps } from "next/app";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import { type FunctionComponent } from "react";

type ConstellatioAppProps = AppProps<{ initialSession: Session }>;

const AppContainer: FunctionComponent<ConstellatioAppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Constellatio</title>
      <link rel="shortcut icon" href="/favicon.png"/>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
    </Head>
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <CustomThemingProvider>
        <ModalsProvider>
          {/* <MeilisearchProvider> */}
          <RouterTransition/>
          <Notifications/>
          <Component {...pageProps}/>
          {/* </MeilisearchProvider> */}
        </ModalsProvider>
      </CustomThemingProvider>
    </SessionContextProvider>
  </>
);

export default api.withTRPC(appWithTranslation(AppContainer));
