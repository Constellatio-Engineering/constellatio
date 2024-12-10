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
      <p>Du hast alle Trainingsmodule abgeschlossen und dein Wissen erheblich verbessert. Weiter so!</p>
      <div css={styles.buttonWrapper}>
        <Button<"button">
          styleType={"secondarySimple"}
          onClick={async () => formbricks.track("feedback_button_clicked")}>
          Feedback
        </Button>
      </div>
    </div>
  );
};
