import { Button } from "@/components/atoms/Button/Button";
import { AuthStateContext } from "@/provider/AuthStateProvider";

import React, { type FunctionComponent, useContext, useEffect, useState } from "react";

import * as styles from "./FeedbackButton.styles";

const FeedbackButton: FunctionComponent = () =>
{
  const { isUserLoggedIn } = useContext(AuthStateContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => 
  {
    const hideButtonTimeout = setTimeout(() => 
    {
      setIsVisible(true);
    }, 2000); 

    return () => 
    {
      clearTimeout(hideButtonTimeout);
    };
  }, []);

  if(!isUserLoggedIn || !isVisible)
  {
    return null;
  }

  return (
    <Button<"button">
      id="feedback-btn"
      css={styles.feedbackButtonStyles}
      styleType="primary"
      size="large"
      type="button">
      Feedback
    </Button>
  );
};

export default FeedbackButton;
