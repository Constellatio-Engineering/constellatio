import {
  type CSSObject, type MantineTheme, type PasswordInputStylesNames, type Styles, type TextInputStylesNames 
} from "@mantine/core";
import { type ReactNode } from "react";

interface TProps 
{
  disabled: boolean | undefined;
  error: ReactNode;
  inputStyleOverwrite: CSSObject | undefined;
  labelStyleOverwrite: CSSObject | undefined;
}

export const textStyles = ({
  disabled,
  error,
  inputStyleOverwrite,
  labelStyleOverwrite
}: TProps) => 
{
  const styles: Styles<TextInputStylesNames, Record<string, any>> = (theme: MantineTheme) => ({
    description: {
      color: theme.colors["neutrals-01"][7],
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: theme.spacing["spacing-20"],
      order: 2,
    },
    error: {
      color: theme.colors["support-error"][3],
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: theme.spacing["spacing-20"],
      order: 3,
    },
    input: {
      "&[data-disabled]": {
        backgroundColor: theme.colors["neutrals-01"][3],
      },
      "::placeholder": {
        color: `${theme.colors["neutrals-01"][7]} !important`,
        fontSize: theme.fontSizes["spacing-16"],
        fontWeight: 500,
        lineHeight: theme.spacing["spacing-24"],
      },
      ":focus": {
        border: error
          ? `1px solid ${theme.colors["support-error"][3]} !important`
          : `1px solid ${theme.colors["neutrals-01"][8]} !important`,
      },
      backgroundColor: theme.colors["neutrals-01"][0],
      border: error
        ? `1px solid ${theme.colors["support-error"][3]} !important`
        : `1px solid ${theme.colors["neutrals-01"][5]}`,
      borderRadius: theme.radius["radius-8"],
      color: `${theme.colors["neutrals-02"][1]} !important`,
      fontSize: theme.fontSizes["spacing-16"],
      fontWeight: 500,
      lineHeight: theme.spacing["spacing-24"],
      padding: `${theme.spacing["spacing-8"]} ${theme.spacing["spacing-16"]}`,
      transition: "all 0.3s ease",
      ...inputStyleOverwrite,
    },
    label: {
      color: error
        ? theme.colors["support-error"][3]
        : disabled
          ? theme.colors["neutrals-01"][7]
          : theme.colors["neutrals-01"][9],
      fontSize: theme.fontSizes["spacing-16"],
      fontWeight: 400,
      lineHeight: theme.spacing["spacing-24"],
      order: 0,
      paddingBottom: theme.spacing["spacing-4"],
      transition: "all 0.3s ease",
      ...labelStyleOverwrite,
    },
    rightSection: {
      height: "20px",
      right: "8px",
      top: "8px",
      width: "20px",
    },
    root: {
      ":focus-within": {
        label: {
          color: error ? theme.colors["support-error"][3] : theme.colors["neutrals-02"][1],
        },
      },
      ":hover": {
        input: {
          border: error
            ? `1px solid ${theme.colors["support-error"][3]}`
            : `1px solid ${theme.colors["neutrals-01"][6]}`,
        },
      },

      display: "flex",
      flexDirection: "column",
    },
    wrapper: {
      color: error ? theme.colors["support-error"][3] : theme.colors["neutrals-01"][7],
      margin: 0,
      order: 1,
      paddingBottom: theme.spacing["spacing-8"],
    },
  });

  return styles;
};

export const passwordStyles = ({
  disabled,
  error,
  inputStyleOverwrite,
  labelStyleOverwrite
}: TProps) => 
{
  const styles: Styles<PasswordInputStylesNames, Record<string, any>> = (theme: MantineTheme) => ({
    description: {
      color: theme.colors["neutrals-01"][7],
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: theme.spacing["spacing-20"],
      order: 2,
    },
    error: {
      color: theme.colors["support-error"][3],
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: theme.spacing["spacing-20"],
      order: 3,
    },
    innerInput: {
      "&[data-disabled]": {
        backgroundColor: theme.colors["neutrals-01"][3],
      },
      "::placeholder": {
        color: `${theme.colors["neutrals-01"][7]} !important`,
        fontSize: theme.fontSizes["spacing-16"],
        fontWeight: 500,
        lineHeight: theme.spacing["spacing-24"],
      },
      color: `${theme.colors["neutrals-02"][1]} !important`,
      fontSize: theme.fontSizes["spacing-16"],
      fontWeight: 500,
      lineHeight: theme.spacing["spacing-24"],

      transition: "all 0.3s ease",
    },
    input: {
      ":focus, :focus-within": {
        border: error
          ? `1px solid ${theme.colors["support-error"][3]} !important`
          : `1px solid ${theme.colors["neutrals-01"][8]} !important`,
      },
      backgroundColor: theme.colors["neutrals-01"][0],
      border: error
        ? `1px solid ${theme.colors["support-error"][3]} !important`
        : `1px solid ${theme.colors["neutrals-01"][5]}`,
      borderRadius: theme.radius["radius-8"],
      padding: `${theme.spacing["spacing-8"]} ${theme.spacing["spacing-16"]}`,
      transition: "all 0.3s ease",
      ...inputStyleOverwrite,
    },
    label: {
      color: error
        ? theme.colors["support-error"][3]
        : disabled
          ? theme.colors["neutrals-01"][7]
          : theme.colors["neutrals-01"][9],
      fontSize: theme.fontSizes["spacing-16"],
      fontWeight: 400,
      lineHeight: theme.spacing["spacing-24"],
      order: 0,
      paddingBottom: theme.spacing["spacing-4"],
      transition: "all 0.3s ease",
      ...labelStyleOverwrite,
    },
    rightSection: {
      height: "20px",
      right: "8px",
      top: "8px",
      width: "20px",
    },
    root: {
      ":focus-within": {
        label: {
          color: error ? theme.colors["support-error"][3] : theme.colors["neutrals-02"][1],
        },
      },
      ":hover .mantine-PasswordInput-input": {
        border: error ? `1px solid ${theme.colors["support-error"][3]}` : `1px solid ${theme.colors["neutrals-01"][6]}`,
      },

      display: "flex",
      flexDirection: "column",
    },
    wrapper: {
      color: error ? theme.colors["support-error"][3] : theme.colors["neutrals-01"][7],
      margin: 0,
      order: 1,
      paddingBottom: theme.spacing["spacing-8"],
      transition: "all 0.3s ease",
    },
  });

  return styles;
};
