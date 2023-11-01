/* eslint-disable react/jsx-max-props-per-line */
import { RouterTransition } from "@/components/atoms/RouterTransition/RouterTransition";
import NewNotificationEarnedWatchdog from "@/components/molecules/newNotificationEarnedWatchdog/NewNotificationEarnedWatchdog";
import { env } from "@/env.mjs";
import { supabase } from "@/lib/supabase";
import AuthStateProvider from "@/provider/AuthStateProvider";
import CustomThemingProvider from "@/provider/CustomThemingProvider";
import InvalidateQueriesProvider from "@/provider/InvalidateQueriesProvider";
import MeilisearchProvider from "@/provider/MeilisearchProvider";
import useSearchBarStore from "@/stores/searchBar.store";
import { api } from "@/utils/api";
import { isProduction } from "@/utils/env";
import { paths } from "@/utils/paths";

import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import {
  type Session, SessionContextProvider
} from "@supabase/auth-helpers-react";
import { type AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { appWithTranslation } from "next-i18next";
import React, { useEffect, type FunctionComponent } from "react";

type ConstellatioAppProps = AppProps<{ initialSession: Session }>;

const AppContainer: FunctionComponent<ConstellatioAppProps> = ({ Component, pageProps }) =>
{
  const router = useRouter();
  const { asPath, pathname } = router || "";
  const url = env.NEXT_PUBLIC_WEBSITE_URL + asPath;
  const appTitle = env.NEXT_PUBLIC_APP_NAME;
  const appDescription = "Constellatio App";
  const ogImage = env.NEXT_PUBLIC_WEBSITE_URL + "/og_image.jpg";
  const ogImageUrlSplitUp = ogImage.split(".");
  const ogImageFileExtension = ogImageUrlSplitUp[ogImageUrlSplitUp.length - 1];
  let pageTitle = appTitle;
  const setSearchValue = useSearchBarStore((s) => s.setSearchValue);

  useEffect(() => 
  {
    if(typeof window !== "undefined")
    {
      if(pathname !== paths.search)
      {
        setSearchValue("");
      }
    }
  }, [pathname, setSearchValue]);

  if(!isProduction)
  {
    pageTitle += ` - ${env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT}`;
  }

  if(ogImageFileExtension !== "jpg")
  {
    throw Error("Favicon file extension ist not '.jpg'");
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta charSet="UTF-8"/>
        <meta name="description" content={appDescription}/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1, maximum-scale=100.0"/>
        <meta name="author" content="Constellatio"/>
        <meta name="robots" content="index, follow"/>
        <meta name="theme-color" content="#ffffff"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=1"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=1"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=1"/>
        <link rel="manifest" href="/site.webmanifest?v=1"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg?v=1" color="#a90000"/>
        <link rel="shortcut icon" href="/favicon.ico?v=1"/>
        <meta name="apple-mobile-web-app-title" content={appTitle}/>
        <meta name="application-name" content={appTitle}/>
        <meta name="msapplication-TileColor" content="#ffffff"/>
        <meta property="og:title" content={appTitle}/>
        <meta property="og:description" content={appDescription}/>
        <meta property="og:image" content={ogImage}/>
        <meta property="og:image:type" content="image/jpeg"/>
        <meta property="og:url" content={url}/>
        <meta property="og:type" content="website"/>
        <meta property="og:locale" content="de_DE"/>
        <meta itemProp="name" content={appTitle}/>
        <meta itemProp="description" content={appDescription}/>
        <meta itemProp="image" content={ogImage}/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content={appTitle}/>
        <meta name="twitter:description" content={appDescription}/>
        <meta name="twitter:image" content={ogImage}/>
      </Head>
      <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
        <InvalidateQueriesProvider>
          <AuthStateProvider>
            <CustomThemingProvider>
              <ModalsProvider>
                <MeilisearchProvider>
                  <RouterTransition/>
                  <Notifications/>
                  <NewNotificationEarnedWatchdog/>
                  <Component {...pageProps}/>
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
