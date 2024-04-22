import { Button } from "@/components/atoms/Button/Button";
import { env } from "@/env.mjs";
import { supabase } from "@/lib/supabase";
import { AuthStateContext } from "@/provider/AuthStateProvider";
import { isProduction } from "@/utils/env";

import { useTheme } from "@emotion/react";
import formbricks, { type FormbricksType } from "@formbricks/js";
import type { AuthChangeEvent, Session, Subscription } from "@supabase/gotrue-js";
import React, {
  type FunctionComponent, useCallback, useContext, useEffect, useRef
} from "react";

import * as styles from "./FeedbackButton.styles";

const FeedbackButton: FunctionComponent = () =>
{
  const theme = useTheme();
  const { isUserLoggedIn } = useContext(AuthStateContext);
  const formBricksRef = useRef<FormbricksType | null>(null);
  const authStateSubscriptionRef = useRef<{data: {subscription: Subscription}}>();

  const onAuthStateChange = useCallback(async (event: AuthChangeEvent, session: Session | null): Promise<void> =>
  {
    switch (event)
    {
      case "INITIAL_SESSION":
      case "SIGNED_IN":
      {

        const { email, id } = session?.user || {};

        if(!id || !email || formBricksRef.current)
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
          formBricksRef.current = formbricks;
        }
        catch (error)
        {
          console.info("Fehler beim initalisieren von Formbricks");
          console.error(error);
        }
        break;
      }
      case "SIGNED_OUT":
      {
        if(formBricksRef.current)
        {
          formBricksRef.current = null;
        }
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
      formBricksRef.current = null;
      currentSubscription?.unsubscribe();
    };
  }, [onAuthStateChange]);

  return (
    <Button<"button">
      id="feedback-btn"
      css={styles.feedbackButtonStyles(isUserLoggedIn ?? false, theme)}
      styleType="primary"
      size="large"
      type="button">
      Feedback
    </Button>
  );
};

export default FeedbackButton;
