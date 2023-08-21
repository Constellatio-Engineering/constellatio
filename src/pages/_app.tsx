import { RouterTransition } from "@/components/atoms/RouterTransition/RouterTransition";
import CustomThemingProvider from "@/provider/CustomThemingProvider";
import { api } from "@/utils/api";

import { Notifications } from "@mantine/notifications";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { type Session, SessionContextProvider } from "@supabase/auth-helpers-react";
import { type AppProps } from "next/app";
import Head from "next/head";
import { type FunctionComponent, useState } from "react";

import "../constants/styles/resets.css";
import "../styles.css";

type MyAppProps = AppProps<{ initialSession: Session }>;

const MyApp: FunctionComponent<MyAppProps> = ({ Component, pageProps }) =>
{
  // this is taken from the docs
  // eslint-disable-next-line react/hook-use-state
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <>
      <Head>
        <title>Constellatio</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
      </Head>
      <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
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
