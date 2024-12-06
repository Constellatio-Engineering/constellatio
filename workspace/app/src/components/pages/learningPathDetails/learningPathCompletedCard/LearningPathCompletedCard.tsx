import { Button } from "@/components/atoms/Button/Button";

import formbricks from "@formbricks/js/app";
import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as sharedStyles from "../LearningPathDetails.styles";
import * as styles from "./LearningPathCompletedCard.styles";

interface ILearningPathCompletedCardProps
{

}

export const LearningPathCompletedCard: FunctionComponent<ILearningPathCompletedCardProps> = () =>
{
  return (
    <div css={[sharedStyles.card, styles.wrapper]}>
      <Title order={1}>Gut gemacht!</Title>
      <div>Du hast alle Trainingsmodule abgeschlossen und dein Wissen im Zivilrecht erheblich verbessert. Weiter so!</div>
      <div css={styles.buttonWrapper}>
        <Button<"button">
          styleType={"secondarySimple"}
          onClick={async () =>
          {
            await formbricks.track("feedback_button_clicked");
          }}>Feedback
        </Button>
      </div>
    </div>
  );
};
