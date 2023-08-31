import { RouterTransition } from "@/components/atoms/RouterTransition/RouterTransition";
import CustomThemingProvider from "@/provider/CustomThemingProvider";
import { supabase } from "@/supabase/client";
import { api } from "@/utils/api";

import { Notifications } from "@mantine/notifications";
import { type Session, SessionContextProvider } from "@supabase/auth-helpers-react";
import { type AppProps } from "next/app";
import Head from "next/head";
import { type FunctionComponent } from "react";

type MyAppProps = AppProps<{ initialSession: Session }>;

const MyApp: FunctionComponent<MyAppProps> = ({ Component, pageProps }) =>
{
  return (
    <>
      <Head>
        <title>Constellatio</title>
        <link rel="shortcut icon" href="/favicon.png"/>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
      </Head>
      <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
        <CustomThemingProvider>
          <RouterTransition/>
          <Notifications/>
          <Component {...pageProps}/>
        </CustomThemingProvider>
      </SessionContextProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
