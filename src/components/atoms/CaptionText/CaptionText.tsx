import { CSSObject, Text, TextProps, createPolymorphicComponent } from "@mantine/core";
import React, { FC } from "react";

type TCaptionText = TextProps & {
  styleType: "caption-01-bold" | "caption-01-medium";
  styleOverwrite?: CSSObject;
};

const _CaptionText: FC<TCaptionText> = ({ styleOverwrite, children, styleType, ...props }) => {
  return (
    <Text
      sx={(theme) => ({
        fontSize: styleType === "caption-01-medium" ? theme.fontSizes["spacing-12"] : theme.fontSizes["spacing-14"],
        fontWeight: styleType.includes("bold") ? 700 : 500,
        lineHeight: styleType === "caption-01-medium" ? theme.spacing["spacing-16"] : theme.spacing["spacing-20"],
        ...styleOverwrite,
      })}
      {...props}
    >
      {children}
    </Text>
  );
};

export const CaptionText = createPolymorphicComponent<"p", TCaptionText>(_CaptionText);
