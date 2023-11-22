import { Button } from "@/components/atoms/Button/Button";

import React, { useEffect, useState } from "react";

import * as styles from "./feedbackButton.styles";

const FeedbackButton: React.FC = () => 
{
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

  return (
    isVisible && (
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
