import { Button } from "@/components/atoms/Button/Button";

import formbricks from "@formbricks/js/app";
import { useLocalStorage } from "@mantine/hooks";
import { IconExclamationCircle } from "@tabler/icons-react";
import React, { type FunctionComponent, useEffect, useState } from "react";

import * as styles from "./LawsLinksDisclaimer.styles";

interface ILawsLinksDisclaimerProps
{
  readonly marginBottomInPx?: number;
}

export const LawsLinksDisclaimer: FunctionComponent<ILawsLinksDisclaimerProps> = ({ marginBottomInPx }) =>
{
  const [isDismissed, setIsDismissed] = useLocalStorage<boolean>({ defaultValue: false, key: "isLawsLinksDisclaimerDismissed" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() =>
  {
    setIsLoading(false);
  }, []);

  if(isLoading || isDismissed)
  {
    return null;
  }

  return (
    <div>
      <div css={styles.wrapper(marginBottomInPx)}>
        <div css={styles.heading}><IconExclamationCircle color={"#5B74C7"}/>Hinweis zu den Gesetzestexten</div>
        <p>Constellatio hilft euch dabei, euch auf eure juristischen (Examens-)Klausuren vorzubereiten.</p>
        <p>Leider sind auch im Jahr 2024 die einzig zugelassenen Hilfsmittel die auf Papier gedruckten Gesetzestexte
          sowie Kommentare im 2. Examen. Wir möchten euch deswegen dazu anhalten, so früh wie möglich genau mit diesen
          Gesetzbüchern zu arbeiten, damit ihr auch unter Stress genau wisst, wohin ihr blättern müsst.
        </p>
        <p>Aus diesem Grund haben wir uns bewusst dafür entschieden, <strong>keine digitalen Gesetzestexte</strong> zu verlinken, damit
          ihr nicht den Fehlanreiz habt, ohne den physischen Gesetzestext zu lernen und dann später in der Klausur zum
          ersten Mal aktiv das Gesetzesbuch nutzt und nicht daran gewöhnt seid.
        </p>
        <p>Wenn ihr eine andere Meinung dazu habt, nutzt den Feedback-Button, und wir verlinken die
          Gesetze gerne digital!
        </p>
        <div css={styles.buttonWrapper}>
          <Button<"button">
            styleType={"secondarySubtle"}
            onClick={async () =>
            {
              await formbricks.track("feedback_button_clicked");
            }}>Feedback
          </Button>
          <Button<"button"> styleType={"primary"} onClick={() => setIsDismissed(true)}>Schließen</Button>
        </div>
      </div>
    </div>
  );
};
