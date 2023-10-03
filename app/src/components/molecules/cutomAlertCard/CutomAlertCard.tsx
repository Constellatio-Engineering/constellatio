import { useMantineTheme } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./CutomAlertCard.styles";
import { BodyText } from "../../atoms/BodyText/BodyText";
import { AlertStoke } from "../../Icons/AlertStroke";
import { CheckCircle } from "../../Icons/CheckCircle";

export interface CutomAlertCardProps
{
  readonly message: string;  
  readonly variant: "error" | "success";
}

const CutomAlertCard: FunctionComponent<CutomAlertCardProps> = ({ message, variant }) => 
{
  const theme = useMantineTheme();
  return (
    <div css={styles.wrapper({ theme, variant })}>
      <BodyText styleType="body-01-medium" component="p">
        {variant === "error" ? <AlertStoke/> : <CheckCircle/>}
        {message}
      </BodyText>
    </div>
  );
};

export default CutomAlertCard;
