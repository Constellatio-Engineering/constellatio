import { AlertProps, CSSObject } from "@mantine/core";
import { Alert } from "@mantine/core";
import React, { FC } from "react";
import { cardStyles } from "./AlertCard.styles";
import { CheckCircle } from "@/components/Icons/CheckCircle";
import { AlertStoke } from "@/components/Icons/AlertStroke";

type TCard = AlertProps & {
  variant: "error" | "success";
  stylesOverwrite?: CSSObject;
};

export const AlertCard: FC<TCard> = ({ variant, stylesOverwrite, children, ...props }) => {
  return (
    <Alert
      styles={cardStyles({ variant, stylesOverwrite})}
      icon={variant === "success" ? <CheckCircle size={24} /> : <AlertStoke size={24} />}
      {...props}
    >
      {children}
    </Alert>
  );
};
