import { RouterTransition } from "@/components/atoms/RouterTransition/RouterTransition";
import { env } from "@/env.mjs";
import { useIsRouterReady } from "@/hooks/useIsRouterReady";
import { supabase } from "@/lib/supabase";
import AuthStateProvider from "@/provider/AuthStateProvider";
import CustomThemingProvider from "@/provider/CustomThemingProvider";
import InvalidateQueriesProvider from "@/provider/InvalidateQueriesProvider";
import MeilisearchProvider from "@/provider/MeilisearchProvider";
import { api } from "@/utils/api";

import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import {
  type Session,
  SessionContextProvider,
} from "@supabase/auth-helpers-react";
import { type AppProps } from "next/app";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";

// new formbricks
import formbricks from "@formbricks/js";

// new posthog stuff
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import React, {
  type FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import FeedbackButton from "@/components/molecules/feedbackButton/feedbackButton";

//TODO:: incorrect place testing styles for feedback-button
import "./feedbackButton.css";

// Check that PostHog is client-side
if (typeof window !== "undefined") {
  //TODO:: include keys in env.mjs  and import it correct

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
    secure_cookie: true,
    capture_pageview: true,
    opt_out_capturing_by_default: true,
    /*  
    TODO:: 
    //you can delete it but I want that I can see it in my last repo commit :)
    bald schauen, aktuell gilt never touch a running system
    opt_out_persistence_by_default: true, */
    /*     disable_cookie: true, */
    autocapture: true,
    disable_session_recording: true,

    loaded: (posthog) => {
      // Enable debug mode in development
      if (env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT !== "production") {
        posthog.debug(true);
      }
    },
  });

  const formbricks_environmentId =
    env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT === "production" //TODO:: change for prod
      ? "clobu3lc158g3pm0gv3giihyn" //TODO:: auslagern in ENV?
      : "clobu3ldw58g9pm0gfufekmwz"; //TODO:: auslagern in ENV?

  formbricks.init({
    environmentId: formbricks_environmentId,
    apiHost: "https://app.formbricks.com",
    debug:
      env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT !== "production" ? true : false, //TODO turnaround for production (aktuell testing)
  });
}

type ConstellatioAppProps = AppProps<{ initialSession: Session }>;

const AppContainer: FunctionComponent<ConstellatioAppProps> = ({
  Component,
  pageProps,
  router,
}) => {
  const { mutate: ping } = api.tracking.ping.useMutation();
  const isRouterReady = useIsRouterReady();
  const isProduction = env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT === "production";
  const [isDocumentVisible, setIsDocumentVisible] = useState<null | boolean>(
    null
  );

  const [isMouseInWindow, setIsMouseInWindow] = useState<null | boolean>(null);
  const interval = useRef<NodeJS.Timer>();

  const [postHogQueueIsStarted, setPostHogQueueIsStarted] = useState(false);

  let title = "Constellatio";

  if (!isProduction) {
    title += ` - ${env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT}`;
  }

  useEffect(() => {
    // Track page views
    const handleRouteChange = () => {
      posthog.capture("$pageview");
      formbricks?.registerRouteChange;
    };
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      //"INITIAL_SESSION" | "SIGNED_IN" | "SIGNED_OUT .. UPDATED etc vlt. noch ergänzen."
      switch (event) {
        case "SIGNED_IN": {
          if (!posthog.has_opted_in_capturing()) {
            const id = session?.user?.id;
            const email = session?.user?.email;

            posthog.identify(id, { email: email });
            posthog.opt_in_capturing();

            formbricks.setUserId(id);
            formbricks.setEmail(email);

            if (postHogQueueIsStarted === false) {
              posthog._start_queue_if_opted_in();
              setPostHogQueueIsStarted(true);

              if (posthog.has_opted_in_capturing()) {
                if (env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT === "production") {
                  /* 
                  TODO:: 
                  //you can delete it but I want that I can see it in my last repo commit :)
                  posthog.set_config({
                  disable_cookie: false,
                  disable_persistence: false,
                }); */
                  posthog.startSessionRecording();
                }
              }
            }
          }
          break;
        }
        case "SIGNED_OUT": {
          posthog.opt_out_capturing();
          posthog.reset();
          formbricks.logout();
        }
      }
    });

    return () => {};
  }, []);

  useEffect(() => {
    const onVisibilityChange = (): void => {
      setIsDocumentVisible(!document.hidden);
    };
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const onWindowMouseOut = (): void => {
      setIsMouseInWindow(false);
    };

    const onWindowMouseOver = (): void => {
      setIsMouseInWindow(true);
    };

    document.addEventListener("mouseleave", onWindowMouseOut);
    document.addEventListener("mouseenter", onWindowMouseOver);

    return () => {
      document.removeEventListener("mouseleave", onWindowMouseOut);
      document.removeEventListener("mouseenter", onWindowMouseOver);
    };
  }, []);

  const onInterval = useCallback(() => {
    if (
      !isDocumentVisible ||
      !isMouseInWindow ||
      !posthog.has_opted_in_capturing() ||
      posthog.has_opted_out_capturing()
    ) {
      return;
    }

    const path = router.asPath;
    ping({ url: path });
  }, [isDocumentVisible, isMouseInWindow, posthog, router.asPath, ping]);

  useEffect(() => {
    if (interval.current) {
      clearInterval(interval.current);
    }

    onInterval(); //TODO::check feuert aktuell glaub 2x beim betreten

    interval.current = setInterval(onInterval, 5000);

    return () => clearInterval(interval.current);
  }, [onInterval]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <PostHogProvider client={posthog}>
          <InvalidateQueriesProvider>
            <AuthStateProvider>
              <CustomThemingProvider>
                <ModalsProvider>
                  <MeilisearchProvider>
                    <RouterTransition />
                    <Notifications />
                    {/* TODO:: Customize feedbackbutton */}

                    <FeedbackButton />

                    {isRouterReady && <Component {...pageProps} />}
                  </MeilisearchProvider>
                </ModalsProvider>
              </CustomThemingProvider>
            </AuthStateProvider>
          </InvalidateQueriesProvider>
        </PostHogProvider>
      </SessionContextProvider>
    </>
  );
};

export default api.withTRPC(appWithTranslation(AppContainer));

/* 
TODOS:

[ ] ----- postHog App
[ ] Dashboard fertig konfigurieren       

[ ] WebApp---------------
[ ] btn Event für search und für search Resultat einbinden

[ ] Schema-------
[ ]   Change both time stamps to Date and See If IT IS also working




[ ] Website--------------
[ ] Scroll Bug beheben

//todos aus cickUp (neu)
Header
[ ] Optional: Wie häufig werden die jeweiligen Menü-Punkte jeweils geklickt?
[ ] Wie häufig wird "Anmelden" geklickt?
[ ] Footer: Wie häufig wird "XX Tage testen" geklickt?
[ ] 

Homepage
[ ] Hero Section: Wie häufig wird "XX Tage gratis testen" CTA Button geklickt?
[ ] Optional: Wie sehr wird sich die Testimonials Sektion angeschaut? Werden die Videos mit Ton wiedergegeben?
[ ] Pricing Section: Wie häufig wird "Mehr erfahren" geklickt?
[ ] Pricing Section: Wie häufig wird "XX Tage kostenlos testen" geklickt?
[ ] Blog Section: Wie häufig wird sich der Blog angeschaut?
[ ] FAQ-Section: Wie häufig werden die einzelnen FAQs angeschaut/ auf- und zugeklappt?
[ ] Wie häufig (Prozent) wird das Kontaktformular verwendet?
[ ] 
[ ] 
Was ist Constellatio
[ ] Wie häufig wird im Hero Bereich auf "XX Tage kostenlos testen" geklickt?
[ ] Wie häufig werden die jeweiligen Drop-Down-Zeilen geklickt?
[ ] Wie häufig klicken die User auf "Constellatio jetzt testen"?
[ ] Ggf., sofern möglich könnte auch noch getracked werden, auf welche Fälle die Nutzer jeweils klicken
[ ] FAQs tracken (optional Lesezeit; eigentlich geht es nur um das Auf- und Zuklappen, wie häufig diese Funktion getätigt wird)
[ ] 
Preis
[ ] Wie häufig werden die FAQs betrachtet?
[ ] Optional: Über uns: Wie häufig werden die Links in den Cards der einzelnen Personen geklickt?



//final checks

[ ] Data sending correct from webApp to postHog
[ ] Data sending correct from webApp to formbricks
[ ] Data sending correct from website to postHog



*/
