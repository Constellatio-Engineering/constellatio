import { RouterTransition } from "@/components/atoms/RouterTransition/RouterTransition";
import CustomThemingProvider from "@/provider/CustomThemingProvider";

import { Notifications } from "@mantine/notifications";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { type Session, SessionContextProvider } from "@supabase/auth-helpers-react";
import { type AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";

import "../constants/styles/resets.css";
import "../styles.css";

type ExtendedAppProps = AppProps<{ initialSession: Session }>;

export default function App(props: ExtendedAppProps)
{
  const { Component, pageProps } = props;

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
}
