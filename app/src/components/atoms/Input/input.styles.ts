/* eslint-disable max-lines */
import { colooors } from "@/constants/styles/colors";
import { type UnknownMantineStylesParams } from "@/utils/types";

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

type TextStyles = Styles<TextInputStylesNames, UnknownMantineStylesParams>;

export const textStyles = ({
  disabled,
  error,
  inputStyleOverwrite,
  labelStyleOverwrite
}: TProps): TextStyles =>
{
  const styles: TextStyles = (theme: MantineTheme) => ({
    description: {
      color: colooors["neutrals-01"][7],
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: theme.spacing["spacing-20"],
      order: 2,
    },
    error: {
      color: colooors["support-error"][3],
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: theme.spacing["spacing-20"],
      order: 3,
    },
    icon: {
      height: "20px",
      left: "12px",
      top: "9px",
      width: "20px",
    },
    input: {
      "&[data-disabled]": {
        backgroundColor: colooors["neutrals-01"][3],
      },
      "::placeholder": {
        color: `${colooors["neutrals-01"][7]} !important`,
        fontSize: theme.fontSizes["spacing-16"],
        fontWeight: 500,
        lineHeight: theme.spacing["spacing-24"],
      },
      ":focus": {
        border: error
          ? `1px solid ${colooors["support-error"][3]} !important`
          : `1px solid ${colooors["neutrals-01"][8]} !important`,
      },
      backgroundColor: colooors["neutrals-01"][0],
      border: error
        ? `1px solid ${colooors["support-error"][3]} !important`
        : `1px solid ${colooors["neutrals-01"][5]}`,
      borderRadius: theme.radius["radius-8"],
      color: `${colooors["neutrals-02"][1]} !important`,
      fontSize: theme.fontSizes["spacing-16"],
      fontWeight: 500,
      lineHeight: theme.spacing["spacing-24"],
      paddingBottom: 8,
      paddingLeft: 16,
      paddingTop: 8,
      transition: "all 0.3s ease",
      ...inputStyleOverwrite,
    },
    label: {
      color: error
        ? colooors["support-error"][3]
        : disabled
          ? colooors["neutrals-01"][7]
          : colooors["neutrals-01"][9],
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
      top: "8px",
    },
    root: {
      ":focus-within": {
        label: {
          color: error ? colooors["support-error"][3] : colooors["neutrals-02"][1],
        },
      },
      ":hover": {
        input: {
          border: error
            ? `1px solid ${colooors["support-error"][3]}`
            : `1px solid ${colooors["neutrals-01"][6]}`,
        },
      },
      display: "flex",
      flexDirection: "column",
      position: "relative",
    },
    wrapper: {
      color: error ? colooors["support-error"][3] : colooors["neutrals-01"][7],
      margin: 0,
      order: 1,
      paddingBottom: theme.spacing["spacing-8"],
    },
  });

  return styles;
};

type PasswordStyles = Styles<PasswordInputStylesNames, UnknownMantineStylesParams>;

export const passwordStyles = ({
  disabled,
  error,
  inputStyleOverwrite,
  labelStyleOverwrite
}: TProps): PasswordStyles =>
{
  const styles: PasswordStyles = (theme: MantineTheme) => ({
    description: {
      color: colooors["neutrals-01"][7],
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: theme.spacing["spacing-20"],
      order: 2,
    },
    error: {
      color: colooors["support-error"][3],
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: theme.spacing["spacing-20"],
      order: 3,
    },
    innerInput: {
      "&[data-disabled]": {
        backgroundColor: colooors["neutrals-01"][3],
      },
      "::placeholder": {
        color: `${colooors["neutrals-01"][7]} !important`,
        fontSize: theme.fontSizes["spacing-16"],
        fontWeight: 500,
        lineHeight: theme.spacing["spacing-24"],
      },
      color: `${colooors["neutrals-02"][1]} !important`,
      fontSize: theme.fontSizes["spacing-16"],
      fontWeight: 500,
      lineHeight: theme.spacing["spacing-24"],

      transition: "all 0.3s ease",
    },
    input: {
      ":focus, :focus-within": {
        border: error
          ? `1px solid ${colooors["support-error"][3]} !important`
          : `1px solid ${colooors["neutrals-01"][8]} !important`,
      },
      backgroundColor: colooors["neutrals-01"][0],
      border: error
        ? `1px solid ${colooors["support-error"][3]} !important`
        : `1px solid ${colooors["neutrals-01"][5]}`,
      borderRadius: theme.radius["radius-8"],
      padding: `${theme.spacing["spacing-8"]} ${theme.spacing["spacing-16"]}`,
      transition: "all 0.3s ease",
      ...inputStyleOverwrite,
    },
    label: {
      color: error
        ? colooors["support-error"][3]
        : disabled
          ? colooors["neutrals-01"][7]
          : colooors["neutrals-01"][9],
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
          color: error ? colooors["support-error"][3] : colooors["neutrals-02"][1],
        },
      },
      ":hover .mantine-PasswordInput-input": {
        border: error ? `1px solid ${colooors["support-error"][3]}` : `1px solid ${colooors["neutrals-01"][6]}`,
      },

      display: "flex",
      flexDirection: "column",
    },
    wrapper: {
      color: error ? colooors["support-error"][3] : colooors["neutrals-01"][7],
      margin: 0,
      order: 1,
      paddingBottom: theme.spacing["spacing-8"],
      transition: "all 0.3s ease",
    },
  });

  return styles;
};
