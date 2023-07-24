import { CSSObject, Text, TextProps, createPolymorphicComponent } from "@mantine/core";
import React, { FC } from "react";

type TSubtitleText = TextProps & {
  styleType: "subtitle-01-bold" | "subtitle-01-medium";
  styleOverwrite?: CSSObject;
};

const _SubtitleText: FC<TSubtitleText> = ({ styleOverwrite, children, styleType, ...props }) => {
  return (
    <Text
      sx={(theme) => ({
        fontSize: theme.fontSizes["spacing-18"],
        fontWeight: styleType === "subtitle-01-bold" ? 700 : 500,
        lineHeight: theme.spacing["spacing-24"],
        ...styleOverwrite,
      })}
      {...props}
    >
      {children}
    </Text>
  );
};

export const SubtitleText = createPolymorphicComponent<"p", TSubtitleText>(_SubtitleText);
