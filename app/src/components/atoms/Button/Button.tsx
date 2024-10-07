import { colooors } from "@/constants/styles/colors";
import { spaciiing } from "@/constants/styles/spacing";

import {
  Button as MantineButton,
  type ButtonProps,
  type ButtonStylesNames,
  type ButtonStylesParams,
  createPolymorphicComponent,
  type CSSObject,
  type Styles,
} from "@mantine/core";
import React, { type ButtonHTMLAttributes, type FC } from "react";

export type TButton = (ButtonProps | ButtonHTMLAttributes<HTMLButtonElement>) & {
  readonly size?: "large" | "medium";
  readonly styleOverwrite?: CSSObject | undefined;
  readonly styleType: "primary" | "secondarySimple" | "secondarySubtle" | "tertiary";
};

const _Button: FC<TButton> = ({
  children,
  size = "large",
  styleOverwrite,
  styleType = "primary",
  ...props
}) => 
{
  const styles: Styles<ButtonStylesNames, ButtonStylesParams> = theme => ({
    leftIcon: {
      marginRight: spaciiing["spacing-4"],
    },
    rightIcon: {
      marginLeft: spaciiing["spacing-4"],
    },
    root: {
      ":active": {
        backgroundColor: styleType === "primary" ? colooors["neutrals-02"][2] : colooors["neutrals-01"][3],
        border:
          styleType === "secondarySimple"
            ? `1px solid ${colooors["neutrals-02"][2]}`
            : styleType === "tertiary" || styleType === "secondarySubtle"
              ? `1px solid ${colooors["neutrals-01"][5]}`
              : "",
      },
      ":disabled": {
        backgroundColor:
          styleType === "secondarySimple" || styleType === "secondarySubtle"
            ? colooors["neutrals-01"][0]
            : colooors["neutrals-01"][3],
        border: styleType !== "primary" ? `1px solid ${colooors["neutrals-01"][3]}` : "",
        color: colooors["neutrals-01"][7],
      },
      ":hover": {
        backgroundColor: styleType === "primary" ? colooors["neutrals-01"][9] : colooors["neutrals-01"][2],
        border:
          styleType === "secondarySimple"
            ? `1px solid ${colooors["neutrals-01"][9]}`
            : styleType === "tertiary" || styleType === "secondarySubtle"
              ? `1px solid ${colooors["neutrals-01"][5]}`
              : "",
      },
      backgroundColor:
        styleType === "primary"
          ? colooors["neutrals-02"][1]
          : styleType === "secondarySimple" || styleType === "secondarySubtle"
            ? colooors["neutrals-01"][0]
            : styleType === "tertiary"
              ? colooors["neutrals-01"][2]
              : "",
      border:
        styleType === "secondarySimple"
          ? `1px solid ${colooors["neutrals-01"][6]}`
          : styleType === "tertiary" || styleType === "secondarySubtle"
            ? `1px solid ${colooors["neutrals-01"][3]}`
            : "",
      color:
        styleType === "primary"
          ? colooors["neutrals-01"][0]
          : styleType === "secondarySimple" || styleType === "secondarySubtle"
            ? colooors["neutrals-02"][1]
            : styleType === "tertiary"
              ? colooors["neutrals-01"][9]
              : "",
      fontFamily: "inherit",
      fontSize: theme.fontSizes["spacing-16"],
      fontStyle: "normal",
      fontWeight: 500,
      height: size === "large" ? spaciiing["spacing-40"] : spaciiing["spacing-32"],
      lineHeight: spaciiing["spacing-24"],
      padding: size === "large"
        ? `${spaciiing["spacing-8"]} ${spaciiing["spacing-16"]}`
        : `${spaciiing["spacing-4"]} ${spaciiing["spacing-10"]}`
      ,
      transition: "all 0.2s ease",
      ...styleOverwrite,
    },
  });

  return (
    <MantineButton radius="full" styles={styles} {...props}>
      {children}
    </MantineButton>
  );
};

export const Button = createPolymorphicComponent<"button", TButton>(_Button);
