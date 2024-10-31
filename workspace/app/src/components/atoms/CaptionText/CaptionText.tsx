import { spaciiing } from "@/constants/styles/spacing";

import { createPolymorphicComponent, type CSSObject, Text, type TextProps } from "@mantine/core";
import { type FC } from "react";

type TCaptionText = TextProps & {
  readonly styleOverwrite?: CSSObject;
  readonly styleType: "caption-01-bold" | "caption-01-medium";
};

const _CaptionText: FC<TCaptionText> = ({
  children,
  styleOverwrite,
  styleType,
  ...props
}) => 
{
  return (
    <Text
      sx={(theme) => ({
        fontSize: styleType === "caption-01-medium" ? theme.fontSizes["spacing-12"] : theme.fontSizes["spacing-14"],
        fontWeight: styleType.includes("bold") ? 700 : 500,
        lineHeight: styleType === "caption-01-medium" ? spaciiing["spacing-16"] : spaciiing["spacing-20"],
        ...styleOverwrite,
      })}
      {...props}>
      {children}
    </Text>
  );
};

export const CaptionText = createPolymorphicComponent<"p", TCaptionText>(_CaptionText);
