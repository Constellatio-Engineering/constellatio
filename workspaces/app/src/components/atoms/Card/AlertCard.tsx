import { AlertStoke } from "@/components/Icons/AlertStroke";
import { CheckCircle } from "@/components/Icons/CheckCircle";

import { Alert, type AlertProps, type CSSObject } from "@mantine/core";
import { useMantineTheme } from "@mantine/styles";
import React, { type FC } from "react";

import { cardStyles } from "./AlertCard.styles";

export type AlertCardProps = AlertProps & {
  readonly shouldUseFullWidth?: boolean;
  readonly stylesOverwrite?: CSSObject;
  readonly variant: "error" | "success" | "warning";
};

export const AlertCard: FC<AlertCardProps> = ({
  children,
  shouldUseFullWidth,
  stylesOverwrite,
  variant,
  ...props
}) => 
{
  const theme = useMantineTheme();

  return (
    <Alert
      {...props}
      styles={cardStyles({
        shouldUseFullWidth, stylesOverwrite, theme, variant 
      })}
      icon={variant === "success" ? <CheckCircle size={24}/> : <AlertStoke size={24}/>}>
      {children}
    </Alert>
  );
};
