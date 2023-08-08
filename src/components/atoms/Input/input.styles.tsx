import { CSSObject, MantineTheme, PasswordInputStylesNames, Styles, TextInputStylesNames } from "@mantine/core";
import { ReactNode } from "react";

type TProps = {
  error: ReactNode;
  disabled: boolean | undefined;
  labelStyleOverwrite: CSSObject | undefined;
  inputStyleOverwrite: CSSObject | undefined;
};

export const textStyles = ({ error, disabled, labelStyleOverwrite, inputStyleOverwrite }: TProps) => {
  const styles: Styles<TextInputStylesNames, Record<string, any>> = (theme: MantineTheme) => ({
    root: {
      display: "flex",
      flexDirection: "column",

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
    },
    label: {
      fontSize: theme.fontSizes["spacing-16"],
      fontWeight: 400,
      lineHeight: theme.spacing["spacing-24"],
      color: error
        ? theme.colors["support-error"][3]
        : disabled
        ? theme.colors["neutrals-01"][7]
        : theme.colors["neutrals-01"][9],
      paddingBottom: theme.spacing["spacing-4"],
      transition: "all 0.3s ease",
      order: 0,
      ...labelStyleOverwrite,
    },
    wrapper: {
      order: 1,
      margin: 0,
      paddingBottom: theme.spacing["spacing-8"],
      color: error ? theme.colors["support-error"][3] : theme.colors["neutrals-01"][7],
    },
    input: {
      borderRadius: theme.radius["radius-8"],
      border: error
        ? `1px solid ${theme.colors["support-error"][3]} !important`
        : `1px solid ${theme.colors["neutrals-01"][5]}`,
      backgroundColor: theme.colors["neutrals-01"][0],
      padding: `${theme.spacing["spacing-8"]} ${theme.spacing["spacing-16"]}`,
      color: `${theme.colors["neutrals-02"][1]} !important`,
      fontSize: theme.fontSizes["spacing-16"],
      fontWeight: 500,
      lineHeight: theme.spacing["spacing-24"],
      transition: "all 0.3s ease",
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
      "&[data-disabled]": {
        backgroundColor: theme.colors["neutrals-01"][3],
      },
      ...inputStyleOverwrite,
    },
    rightSection: {
      width: "20px",
      height: "20px",
      top: "8px",
      right: "8px",
    },
    description: {
      order: 2,
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: theme.spacing["spacing-20"],
      color: theme.colors["neutrals-01"][7],
    },
    error: {
      order: 3,
      color: theme.colors["support-error"][3],
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: theme.spacing["spacing-20"],
    },
  });

  return styles;
};

export const passwordStyles = ({ error, disabled, labelStyleOverwrite, inputStyleOverwrite }: TProps) => {
  const styles: Styles<PasswordInputStylesNames, Record<string, any>> = (theme: MantineTheme) => ({
    root: {
      display: "flex",
      flexDirection: "column",

      ":focus-within": {
        label: {
          color: error ? theme.colors["support-error"][3] : theme.colors["neutrals-02"][1],
        },
      },
      ":hover .mantine-PasswordInput-input": {
        border: error ? `1px solid ${theme.colors["support-error"][3]}` : `1px solid ${theme.colors["neutrals-01"][6]}`,
      },
    },
    label: {
      fontSize: theme.fontSizes["spacing-16"],
      fontWeight: 400,
      lineHeight: theme.spacing["spacing-24"],
      color: error
        ? theme.colors["support-error"][3]
        : disabled
        ? theme.colors["neutrals-01"][7]
        : theme.colors["neutrals-01"][9],
      paddingBottom: theme.spacing["spacing-4"],
      transition: "all 0.3s ease",
      order: 0,
      ...labelStyleOverwrite,
    },
    wrapper: {
      order: 1,
      margin: 0,
      paddingBottom: theme.spacing["spacing-8"],
      color: error ? theme.colors["support-error"][3] : theme.colors["neutrals-01"][7],
      transition: "all 0.3s ease",
    },
    input: {
      borderRadius: theme.radius["radius-8"],
      border: error
        ? `1px solid ${theme.colors["support-error"][3]} !important`
        : `1px solid ${theme.colors["neutrals-01"][5]}`,
      backgroundColor: theme.colors["neutrals-01"][0],
      padding: `${theme.spacing["spacing-8"]} ${theme.spacing["spacing-16"]}`,
      transition: "all 0.3s ease",
      ":focus, :focus-within": {
        border: error
          ? `1px solid ${theme.colors["support-error"][3]} !important`
          : `1px solid ${theme.colors["neutrals-01"][8]} !important`,
      },
      ...inputStyleOverwrite,
    },
    innerInput: {
      fontSize: theme.fontSizes["spacing-16"],
      fontWeight: 500,
      lineHeight: theme.spacing["spacing-24"],
      color: `${theme.colors["neutrals-02"][1]} !important`,
      transition: "all 0.3s ease",
      "::placeholder": {
        color: `${theme.colors["neutrals-01"][7]} !important`,
        fontSize: theme.fontSizes["spacing-16"],
        fontWeight: 500,
        lineHeight: theme.spacing["spacing-24"],
      },

      "&[data-disabled]": {
        backgroundColor: theme.colors["neutrals-01"][3],
      },
    },
    rightSection: {
      width: "20px",
      height: "20px",
      top: "8px",
      right: "8px",
    },
    description: {
      order: 2,
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: theme.spacing["spacing-20"],
      color: theme.colors["neutrals-01"][7],
    },
    error: {
      order: 3,
      color: theme.colors["support-error"][3],
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: theme.spacing["spacing-20"],
    },
  });

  return styles;
};
