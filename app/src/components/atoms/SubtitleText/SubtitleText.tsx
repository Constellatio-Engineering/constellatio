import { type CSSObject, Text, type TextProps, createPolymorphicComponent } from "@mantine/core";
import React, { type FC } from "react";

type TSubtitleText = TextProps & {
  readonly size?: number;
  readonly styleOverwrite?: CSSObject;
  readonly styleType: "subtitle-01-bold" | "subtitle-01-medium";
};

const _SubtitleText: FC<TSubtitleText> = ({
  children,
  size,
  styleOverwrite,
  styleType,
  ...props
}) => 
{
  return (
    <Text
      sx={(theme) => ({
        fontSize: size ?? theme.fontSizes["spacing-18"],
        fontWeight: styleType === "subtitle-01-bold" ? 700 : 500,
        lineHeight: theme.spacing["spacing-24"],
        ...styleOverwrite,
      })}
      {...props}>
      {children}
    </Text>
  );
};

export const SubtitleText = createPolymorphicComponent<"p", TSubtitleText>(_SubtitleText);
