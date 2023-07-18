import { CSSObject, Text, TextProps, createPolymorphicComponent } from "@mantine/core";
import React, { FC } from "react";

type TBodyText = TextProps & {
  styleType: "body-01-bold" | "body-01-medium" | "body-01-regular" | "body-02-medium";
  styleOverwrite?: CSSObject;
};

const _BodyText: FC<TBodyText> = ({ styleOverwrite, children, styleType, ...props }) => {
  return (
    <Text
      sx={(theme) => ({
        fontSize: styleType === "body-02-medium" ? theme.fontSizes["spacing-14"] : theme.fontSizes["spacing-16"],
        fontWeight: styleType.includes("bold") ? 700 : styleType.includes("medium") ? 500 : 400,
        lineHeight: styleType === "body-02-medium" ? theme.spacing["spacing-20"] : theme.spacing["spacing-24"],
        ...styleOverwrite,
      })}
      {...props}
    >
      {children}
    </Text>
  );
};

export const BodyText = createPolymorphicComponent<"p", TBodyText>(_BodyText);
