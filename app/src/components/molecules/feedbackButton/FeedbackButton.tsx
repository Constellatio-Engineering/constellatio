import { UnstyledButton } from "@/components/molecules/unstyledButton/UnstyledButton";
import { env } from "@/env.mjs";
import { supabase } from "@/lib/supabase";
import { AuthStateContext } from "@/provider/AuthStateProvider";
import { isProduction } from "@/utils/env";

import { useTheme } from "@emotion/react";
import formbricks from "@formbricks/js/app";
import type { AuthChangeEvent, Session, Subscription } from "@supabase/gotrue-js";
import React, {
  type FunctionComponent, useCallback, useContext, useEffect, useRef
} from "react";

import * as styles from "./FeedbackButton.styles";

const FeedbackButton: FunctionComponent = () =>
{
  const theme = useTheme();
  const { isUserLoggedIn } = useContext(AuthStateContext);
  const authStateSubscriptionRef = useRef<{data: {subscription: Subscription}}>();
  const hasFormbricksInitialized = useRef(false);

  const onAuthStateChange = useCallback(async (event: AuthChangeEvent, session: Session | null): Promise<void> =>
  {
    switch (event)
    {
      case "INITIAL_SESSION":
      case "SIGNED_IN":
      {
        const { email, id } = session?.user || {};

        if(!id || !email || hasFormbricksInitialized.current)
        {
          break;
        }

        try
        {
          await formbricks.init({
            apiHost: env.NEXT_PUBLIC_FORMBRICKS_HOST,
            debug: true, // !isProduction,
            environmentId: isProduction
              ? env.NEXT_PUBLIC_FORMBRICKS_KEY_PRODUCTION
              : env.NEXT_PUBLIC_FORMBRICKS_KEY_TESTINGS,
            userId: id,
          });

          await formbricks.setEmail(email);
          hasFormbricksInitialized.current = true;
        }
        catch (error)
        {
          console.log("Fehler beim initialisieren von Formbricks", error);
        }
        break;
      }
      case "SIGNED_OUT":
      {
        await formbricks.logout();
        hasFormbricksInitialized.current = false;
        break;
      }
      default:
      {
        break;
      }
    }
  }, []);

  useEffect(() =>
  {
    const currentSubscription = authStateSubscriptionRef.current?.data.subscription;
    currentSubscription?.unsubscribe();

    authStateSubscriptionRef.current = supabase.auth.onAuthStateChange(onAuthStateChange);

    return () =>
    {
      hasFormbricksInitialized.current = false;
      currentSubscription?.unsubscribe();
    };
  }, [onAuthStateChange]);

  return (
    <UnstyledButton
      styles={styles.feedbackButtonStyles(isUserLoggedIn ?? false, theme)}
      onClick={() => formbricks.track("feedback_button_clicked")}>
      Feedback
    </UnstyledButton>
  );
};

export default FeedbackButton;
