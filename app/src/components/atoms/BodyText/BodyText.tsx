import { spaciiing } from "@/constants/styles/spacing";

import { createPolymorphicComponent, type CSSObject, Text, type TextProps } from "@mantine/core";
import React, { type FC } from "react";

type TBodyText = TextProps & {
  readonly styleOverwrite?: CSSObject;
  readonly styleType: "body-01-bold" | "body-01-medium" | "body-01-regular" | "body-02-medium";
};

const _BodyText: FC<TBodyText> = ({
  children,
  styleOverwrite,
  styleType,
  ...props
}) => 
{
  return (
    <Text
      sx={(theme) => ({
        fontSize: styleType === "body-02-medium" ? theme.fontSizes["spacing-14"] : theme.fontSizes["spacing-16"],
        fontWeight: styleType.includes("bold") ? 700 : styleType.includes("medium") ? 500 : 400,
        lineHeight: styleType === "body-02-medium" ? spaciiing["spacing-20"] : spaciiing["spacing-24"],
        ...styleOverwrite,
      })}
      {...props}>
      {children}
    </Text>
  );
};

export const BodyText = createPolymorphicComponent<"p", TBodyText>(_BodyText);
