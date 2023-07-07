import React, { ButtonHTMLAttributes, FC } from "react";
import {
  Button as MantineButton,
  ButtonProps,
  MantineTheme,
  Styles,
  ButtonStylesParams,
  ButtonStylesNames,
  CSSObject,
} from "@mantine/core";

type TButton = (ButtonProps | ButtonHTMLAttributes<HTMLButtonElement>) & {
  title: string;
  styleType?: "primary" | "secondarySimple" | "secondarySubtle" | "tertiary";
  size?: "large" | "medium";
  styleOverwrite?: CSSObject | undefined;
};
export const Button: FC<TButton> = ({
  title,
  styleType = "primary",
  size = "large",
  styleOverwrite,
  ...props
}) => {
  const styles: Styles<ButtonStylesNames, ButtonStylesParams> = (theme: MantineTheme) => ({
    root: {
      height: size === "large" ? theme.spacing["spacing-40"] : theme.spacing["spacing-32"],
      padding: `${theme.spacing["spacing-8"]} ${theme.spacing["spacing-16"]}`,
      fontSize: theme.fontSizes["spacing-16"],
      fontWeight: 500,
      lineHeight: theme.spacing["spacing-24"],
      fontStyle: "normal",
      fontFamily: "inherit",
      color:
        styleType === "primary"
          ? theme.colors["neutrals-01"][0]
          : styleType === "secondarySimple" || styleType === "secondarySubtle"
          ? theme.colors["neutrals-02"][1]
          : styleType === "tertiary"
          ? theme.colors["neutrals-01"][9]
          : "",
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
          ? `1px solid ${theme.colors["neutrals-02"][1]}`
          : styleType === "tertiary" || styleType === "secondarySubtle"
          ? `1px solid ${theme.colors["neutrals-01"][3]}`
          : "",
      transition: "all 0.3s ease",
      ":hover": {
        backgroundColor: styleType === "primary" ? theme.colors["neutrals-01"][9] : theme.colors["neutrals-01"][2],
        border:
          styleType === "secondarySimple"
            ? `1px solid ${theme.colors["neutrals-01"][9]}`
            : styleType === "tertiary" || styleType === "secondarySubtle"
            ? `1px solid ${theme.colors["neutrals-01"][5]}`
            : "",
      },
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
        color: theme.colors["neutrals-01"][7],
        backgroundColor:
          styleType === "secondarySimple" || styleType === "secondarySubtle"
            ? theme.colors["neutrals-01"][0]
            : theme.colors["neutrals-01"][3],
        border: styleType !== "primary" ? `1px solid ${theme.colors["neutrals-01"][3]}` : "",
      },
      ...styleOverwrite,
    },
  });

  return (
    <MantineButton radius="full" title={title} styles={styles} {...props}>
      {title}
    </MantineButton>
  );
};
