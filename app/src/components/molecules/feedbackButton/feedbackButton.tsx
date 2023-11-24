import { Button } from "@/components/atoms/Button/Button";
import { AuthStateContext } from "@/provider/AuthStateProvider";

import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

import * as styles from "./feedbackButton.styles";

const FeedbackButton: React.FC = () => 
{
  const { isUserLoggedIn } = useContext(AuthStateContext);
  const router = useRouter();
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

  if(!isUserLoggedIn)
  {
    return null;
  }

  return (
    isVisible && (router.pathname !== "/login") && (
      <Button<"button">
        id="feedback-btn"
        css={styles.feedbackButtonStyles}
        styleType="primary"
        size="large"
        type="button">
        Feedback
      </Button>
    )
  );
};

export default FeedbackButton;
