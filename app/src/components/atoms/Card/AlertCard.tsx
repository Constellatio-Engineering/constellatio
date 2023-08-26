import { AlertStoke } from "@/components/Icons/AlertStroke";
import { CheckCircle } from "@/components/Icons/CheckCircle";

import { type AlertProps, type CSSObject, Alert } from "@mantine/core";
import React, { type FC } from "react";

import { cardStyles } from "./AlertCard.styles";

export type AlertCardProps = AlertProps & {
  readonly stylesOverwrite?: CSSObject;
  readonly variant: "error" | "success";
};

export const AlertCard: FC<AlertCardProps> = ({
  children,
  stylesOverwrite,
  variant,
  ...props
}) => 
{
  return (
    <Alert
      styles={cardStyles({ stylesOverwrite, variant })}
      icon={variant === "success" ? <CheckCircle size={24}/> : <AlertStoke size={24}/>}
      {...props}>
      {children}
    </Alert>
  );
};
