import {
  Button as MantineButton,
  type ButtonProps,
  type Styles,
  type ButtonStylesNames,
  type CSSObject,
  createPolymorphicComponent, type ButtonStylesParams,
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
      marginRight: theme.spacing["spacing-4"],
    },
    rightIcon: {
      marginLeft: theme.spacing["spacing-4"],
    },
    root: {
      ":active": {
        backgroundColor: styleType === "primary" ? theme.colors["neutrals-02"][2] : theme.colors["neutrals-01"][3],
        border:
          styleType === "secondarySimple"
            ? `1px solid ${theme.colors["neutrals-02"][2]}`
            : styleType === "tertiary" || styleType === "secondarySubtle"
              ? `1px solid ${theme.colors["neutrals-01"][5]}`
              : "",
      },
      ":disabled": {
        backgroundColor:
          styleType === "secondarySimple" || styleType === "secondarySubtle"
            ? theme.colors["neutrals-01"][0]
            : theme.colors["neutrals-01"][3],
        border: styleType !== "primary" ? `1px solid ${theme.colors["neutrals-01"][3]}` : "",
        color: theme.colors["neutrals-01"][7],
      },
      ":hover": {
        backgroundColor: styleType === "primary" ? theme.colors["neutrals-01"][9] : theme.colors["neutrals-01"][2],
        border:
          styleType === "secondarySimple"
            ? `1px solid ${theme.colors["neutrals-01"][9]}`
            : styleType === "tertiary" || styleType === "secondarySubtle"
              ? `1px solid ${theme.colors["neutrals-01"][5]}`
              : "",
      },
      backgroundColor:
        styleType === "primary"
          ? theme.colors["neutrals-02"][1]
          : styleType === "secondarySimple" || styleType === "secondarySubtle"
            ? theme.colors["neutrals-01"][0]
            : styleType === "tertiary"
              ? theme.colors["neutrals-01"][2]
              : "",
      border:
        styleType === "secondarySimple"
          ? `1px solid ${theme.colors["neutrals-01"][6]}`
          : styleType === "tertiary" || styleType === "secondarySubtle"
            ? `1px solid ${theme.colors["neutrals-01"][3]}`
            : "",
      color:
        styleType === "primary"
          ? theme.colors["neutrals-01"][0]
          : styleType === "secondarySimple" || styleType === "secondarySubtle"
            ? theme.colors["neutrals-02"][1]
            : styleType === "tertiary"
              ? theme.colors["neutrals-01"][9]
              : "",
      fontFamily: "inherit",
      fontSize: theme.fontSizes["spacing-16"],
      fontStyle: "normal",
      fontWeight: 500,
      height: size === "large" ? theme.spacing["spacing-40"] : theme.spacing["spacing-32"],
      lineHeight: theme.spacing["spacing-24"],
      padding: size === "large"
        ? `${theme.spacing["spacing-8"]} ${theme.spacing["spacing-16"]}`
        : `${theme.spacing["spacing-4"]} ${theme.spacing["spacing-10"]}`
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
