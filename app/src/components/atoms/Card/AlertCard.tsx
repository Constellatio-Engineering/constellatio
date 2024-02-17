import { AlertStoke } from "@/components/Icons/AlertStroke";
import { CheckCircle } from "@/components/Icons/CheckCircle";

import { type AlertProps, type CSSObject, Alert } from "@mantine/core";
import React, { type FC } from "react";

import { cardStyles } from "./AlertCard.styles";

export type AlertCardProps = AlertProps & {
  readonly shouldUseFullWidth?: boolean;
  readonly stylesOverwrite?: CSSObject;
  readonly variant: "error" | "success";
};

export const AlertCard: FC<AlertCardProps> = ({
  children,
  shouldUseFullWidth,
  stylesOverwrite,
  variant,
  ...props
}) => 
{
  return (
    <Alert
      {...props}
      styles={cardStyles({ shouldUseFullWidth, stylesOverwrite, variant })}
      icon={variant === "success" ? <CheckCircle size={24}/> : <AlertStoke size={24}/>}>
      {children}
    </Alert>
  );
};
