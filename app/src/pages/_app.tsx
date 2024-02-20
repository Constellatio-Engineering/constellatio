/* eslint-disable react/jsx-max-props-per-line */
import { RouterTransition } from "@/components/atoms/RouterTransition/RouterTransition";
import Tracking from "@/components/helpers/Tracking";
import FeedbackButton from "@/components/molecules/feedbackButton/FeedbackButton";
import NewNotificationEarnedWatchdog from "@/components/molecules/newNotificationEarnedWatchdog/NewNotificationEarnedWatchdog";
import ComputerRecommendedModal from "@/components/organisms/computerRecommendedModal/ComputerRecommendedModal";
import FileViewer from "@/components/organisms/fileViewer/FileViewer";
import DocumentEditor from "@/components/organisms/papersBlock/documentEditor/DocumentEditor";
import SubscriptionModal from "@/components/organisms/subscriptionModal/SubscriptionModal";
import MaintenancePage from "@/components/pages/maintenancePage/MaintenancePage";
import { env } from "@/env.mjs";
import { supabase } from "@/lib/supabase";
import AuthStateProvider from "@/provider/AuthStateProvider";
import CustomThemingProvider from "@/provider/CustomThemingProvider";
import InvalidateQueriesProvider from "@/provider/InvalidateQueriesProvider";
import MeilisearchProvider from "@/provider/MeilisearchProvider";
import useSearchBarStore from "@/stores/searchBar.store";
import { api } from "@/utils/api";
import { isProduction, isTrackingEnabled } from "@/utils/env";
import { appPaths } from "@/utils/paths";

import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { type NextPage } from "next";
import { type AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { appWithTranslation } from "next-i18next";
import { posthog } from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import React, {
  useEffect, type FunctionComponent, type ReactElement, type ReactNode, Fragment
} from "react";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type LayoutProps = {
  readonly Component: NextPageWithLayout;
  readonly pageProps: object;
};

const Layout: FunctionComponent<LayoutProps> = ({ Component, pageProps }) =>
{
  if(Component.getLayout) 
  {
    return Component.getLayout(<Component {...pageProps}/>);
  }
  else 
  {
    return <Component {...pageProps}/>;
  }
};

type ConstellatioAppProps = AppProps & {
  readonly Component: NextPageWithLayout;
};

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

  useEffect(() =>
  {
    if(!pathname.startsWith(appPaths.search))
    {
      useSearchBarStore.setState({ searchValue: "" });
    }
  }, [pathname]);

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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1"/>
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
            <PostHogProvider client={posthog}>
              <CustomThemingProvider>
                <ModalsProvider>
                  <MeilisearchProvider>
                    {env.NEXT_PUBLIC_IS_IN_MAINTENANCE_MODE ? (
                      <MaintenancePage/>
                    ) : (
                      <Fragment>
                        <RouterTransition/>
                        <Notifications/>
                        <NewNotificationEarnedWatchdog/>
                        <SubscriptionModal/>
                        <ComputerRecommendedModal/>
                        <FileViewer/>
                        <DocumentEditor/>
                        <FeedbackButton/>
                        {isTrackingEnabled && <Tracking/>}
                        <Layout Component={Component} pageProps={pageProps}/>
                      </Fragment>
                    )}
                  </MeilisearchProvider>
                </ModalsProvider>
              </CustomThemingProvider>
            </PostHogProvider>
          </AuthStateProvider>
        </InvalidateQueriesProvider>
      </SessionContextProvider>
    </>
  );
};

export default api.withTRPC(appWithTranslation(AppContainer));
