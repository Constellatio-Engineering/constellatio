import { UnstyledButton } from "@/components/molecules/unstyledButton/UnstyledButton";
import { env } from "@/env.mjs";
import { AuthStateContext } from "@/provider/AuthStateProvider";

import { useTheme } from "@emotion/react";
import formbricks from "@formbricks/js/app";
import { Tooltip } from "@mantine/core";
import { type FunctionComponent, useContext, useEffect, useRef } from "react";

import * as styles from "./FeedbackButton.styles";

const FeedbackButton: FunctionComponent = () =>
{
  const theme = useTheme();
  const authState = useContext(AuthStateContext);
  const isUserLoggedIn = authState.isUserLoggedIn ?? false;
  const { isLoading } = authState;
  const user = authState.isUserLoggedIn ? authState.user : null;
  const hasFormbricksInitialized = useRef(false);

  useEffect(() =>
  {
    if(isLoading || !user)
    {
      return;
    }

    const initFormBricks = async (): Promise<void> =>
    {
      await formbricks.init({
        apiHost: env.NEXT_PUBLIC_FORMBRICKS_HOST,
        environmentId: env.NEXT_PUBLIC_FORMBRICKS_ENVIRONMENT_ID,
        userId: user.id,
        // debug is not available anymore, instead now you have to append ?formbricksDebug=true to the URL
      });

      hasFormbricksInitialized.current = true;
    };

    const setUserAttributes = async (): Promise<void> =>
    {
      const email = user?.email;

      if(email)
      {
        await formbricks.setEmail(email);
      }
    };

    const logOut = async (): Promise<void> =>
    {
      // If the user is not signed in, we need to log out from Formbricks
      // but this causes it to be uninitialized, so we need to init it again
      await formbricks.logout();
      await initFormBricks();
    };

    const configureFormbricks = async (): Promise<void> =>
    {
      if(!hasFormbricksInitialized.current)
      {
        await initFormBricks();
      }

      if(hasFormbricksInitialized.current)
      {
        if(isUserLoggedIn)
        {
          await setUserAttributes();
        }
        else
        {
          await logOut();
        }
      }
    };

    configureFormbricks().catch((error) => console.error("Error configuring Formbricks", error));

  }, [user, isLoading, isUserLoggedIn]);

  if(!isUserLoggedIn)
  {
    return null;
  }

  return (
    <Tooltip
      label={"Du hast eine Anmerkung zu einem Fall oder ein Verbesserungsvorschlag zu unserer App? Dann freuen wir uns über dein Feedback!"}
      multiline={true}
      width={200}
      openDelay={800}
      position={"left"}
      withArrow={true}>
      <UnstyledButton
        styles={styles.feedbackButtonStyles(theme)}
        onClick={async () =>
        {
          await formbricks.track("feedback_button_clicked");
        }}>
        Feedback
      </UnstyledButton>
    </Tooltip>
  );
};

export default FeedbackButton;
