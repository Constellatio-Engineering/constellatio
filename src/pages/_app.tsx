import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { Session, SessionContextProvider } from "@supabase/auth-helpers-react";
import { Notifications } from "@mantine/notifications";
import { RouterTransition } from "@/components/atoms/RouterTransition";

type ExtendedAppProps = AppProps<{ initialSession: Session }>;

export default function App(props: ExtendedAppProps) {
  const { Component, pageProps } = props;
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <>
      <Head>
        <title>Constellatio</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme: "light" }}
        >
          <RouterTransition />
          <Notifications />
          <Component {...pageProps} />
        </MantineProvider>
      </SessionContextProvider>
    </>
  );
}
