/* eslint-disable react/jsx-max-props-per-line, max-lines */
import { RouterTransition } from "@/components/atoms/RouterTransition/RouterTransition";
import ComputerRecommendedModal from "@/components/computerRecommendedModal/ComputerRecommendedModal";
import FeedbackButton from "@/components/molecules/feedbackButton/feedbackButton";
import NewNotificationEarnedWatchdog from "@/components/molecules/newNotificationEarnedWatchdog/NewNotificationEarnedWatchdog";
import SubscriptionModal from "@/components/organisms/subscriptionModal/SubscriptionModal";
import { env } from "@/env.mjs";
import { supabase } from "@/lib/supabase";
import AuthStateProvider from "@/provider/AuthStateProvider";
import CustomThemingProvider from "@/provider/CustomThemingProvider";
import InvalidateQueriesProvider from "@/provider/InvalidateQueriesProvider";
import MeilisearchProvider from "@/provider/MeilisearchProvider";
import useSearchBarStore from "@/stores/searchBar.store";
import { api } from "@/utils/api";
import { isProduction, isTrackingEnabled } from "@/utils/env";
import { initFormbricks, resetFormbricks } from "@/utils/formbricks";
import { paths } from "@/utils/paths";

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
import {
  useEffect, type FunctionComponent, type ReactElement, type ReactNode, useRef
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

if(typeof window !== "undefined")
{
  if(isTrackingEnabled)
  {
    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
      autocapture: true,
      capture_pageview: true,
      disable_cookie: true,
      disable_session_recording: true,
      loaded: (posthog) =>
      {
        if(!isProduction)
        {
          posthog.debug(true);
        }
      },
      opt_out_capturing_by_default: true,
      opt_out_persistence_by_default: true,
      secure_cookie: true,
    });
  }

  else 
  {
    posthog.init("invalide_token", {
      api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
      autocapture: false,
      capture_pageview: false,
      disable_cookie: true, 
      disable_session_recording: true,
      loaded: (posthog) =>
      {
        if(!isProduction)
        {
          posthog.opt_out_capturing();
        }
      },
      opt_out_capturing_by_default: true,
      opt_out_persistence_by_default: true, 
      secure_cookie: true,
    });
  }

  supabase.auth.onAuthStateChange(async (event, session) =>    
  {
    switch (event)
    {
      case "INITIAL_SESSION":
      case "SIGNED_IN": 
        const id = session?.user?.id;
        const email = session?.user?.email;

        if(!id || !email) 
        {
          return;
        }
        
        await initFormbricks(
          {
            apiHost: env.NEXT_PUBLIC_FORMBRICKS_HOST,
            debug: !isProduction,
            email,
            environmentId: isProduction
              ? env.NEXT_PUBLIC_FORMBRICKS_KEY_PRODUCTION
              : env.NEXT_PUBLIC_FORMBRICKS_KEY_TESTINGS,
            userId: id
          }
        );

        if(isTrackingEnabled)
        {
          posthog.set_config({
            disable_cookie: false,
            disable_persistence: false,
          });

          if(!posthog.has_opted_in_capturing())
          {
            posthog.opt_in_capturing();    
            posthog.identify(id, { email });
            
            posthog._start_queue_if_opted_in();

            if(posthog.has_opted_in_capturing())
            {
              if(isProduction)
              {
                posthog.startSessionRecording();
              }
            }
            
          }
        }

        break;

      case "SIGNED_OUT": {

        await resetFormbricks();

        if(isTrackingEnabled)
        {
          posthog.stopSessionRecording();

          if(posthog.has_opted_in_capturing())
          {
            posthog.opt_out_capturing();
          }

          posthog.set_config({
            disable_cookie: true,
            disable_persistence: true,
          });

          posthog.reset(true);            
        }
          
        break;
      }
      default:
        break;
    }
  });
}

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
  const isDocumentVisibleRef = useRef<boolean | null>(null);
  let pageTitle = appTitle;

  useEffect(() => 
  {
    if(isTrackingEnabled) 
    {
      const handleRouteChange = (): void => 
      {
        posthog.capture("$pageview");
      };
      router.events.on("routeChangeComplete", handleRouteChange);
  
      return () => 
      {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
    return () => {};
  }, [router.events]);

  useEffect(() => 
  {
    if(isTrackingEnabled) 
    {
      const onVisibilityChange = (): void => 
      {
        const visibility = !document.hidden;

        if(isDocumentVisibleRef.current !== visibility) 
        {
          isDocumentVisibleRef.current = visibility;

          if(visibility) 
          {
            posthog.capture("$visibilityOn");
          } 
          else 
          {
            posthog.capture("$visibilityOff");
          }
        }
      };

      document.addEventListener("visibilitychange", onVisibilityChange);

      return () => 
      {
        document.removeEventListener("visibilitychange", onVisibilityChange);
      };
    }
    return () => {};
  }, []);

  useEffect(() =>
  {
    if(!pathname.startsWith(paths.search))
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
            <PostHogProvider client={posthog}>
              <CustomThemingProvider>
                <ModalsProvider>
                  <MeilisearchProvider>
                    <RouterTransition/>
                    <Notifications/>
                    <NewNotificationEarnedWatchdog/>
                    <SubscriptionModal/>
                    <ComputerRecommendedModal/>
                    <FeedbackButton/>
                    <Layout Component={Component} pageProps={pageProps}/>
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
