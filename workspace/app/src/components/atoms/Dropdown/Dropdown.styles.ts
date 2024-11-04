import { colooors } from "@/constants/styles/colors";
import { spaciiing } from "@/constants/styles/spacing";
import { type UnknownMantineStylesParams } from "@/utils/types";

import { type SelectStylesNames, type Styles } from "@mantine/core";
import { type ReactNode } from "react";

type DropdownStyles = Styles<SelectStylesNames, UnknownMantineStylesParams>;

export const dropdownStyles = ({ disabled, error }: { disabled?: boolean; error: ReactNode }): DropdownStyles =>
{
  const styles: DropdownStyles = theme => ({
    description: {
      color: colooors["neutrals-01"][7],
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: spaciiing["spacing-20"],
      order: 2,
    },
    dropdown: {
      backgroundColor: colooors["neutrals-01"][0],
      border: `1px solid ${colooors["neutrals-01"][3]}`,
      borderRadius: theme.radius["radius-12"],
      boxShadow: "0px 8px 44px 0px rgba(0, 0, 0, 0.04)",
    },
    error: {
      color: colooors["support-error"][3],
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: spaciiing["spacing-20"],
      order: 3,
    },
    input: {
      "&[data-disabled]": {
        backgroundColor: colooors["neutrals-01"][3],
      },
      "::placeholder": {
        color: `${colooors["neutrals-01"][7]} !important`,
        fontSize: theme.fontSizes["spacing-16"],
        fontWeight: 500,
        lineHeight: spaciiing["spacing-24"],
        transition: "all 0.3s ease",
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
      lineHeight: spaciiing["spacing-24"],
      padding: `${spaciiing["spacing-8"]} ${spaciiing["spacing-16"]}`,
      transition: "all 0.3s ease",
    },
    label: {
      color: error
        ? colooors["support-error"][3]
        : disabled
          ? colooors["neutrals-01"][7]
          : colooors["neutrals-01"][9],
      fontSize: theme.fontSizes["spacing-16"],
      fontWeight: 400,
      lineHeight: spaciiing["spacing-24"],
      order: 0,
      paddingBottom: spaciiing["spacing-4"],
      transition: "all 0.3s ease",
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
      ":hover": {
        input: {
          "::placeholder": {
            color: `${colooors["neutrals-02"][1]} !important`,
          },
          border: error
            ? `1px solid ${colooors["support-error"][3]}`
            : `1px solid ${colooors["neutrals-01"][6]}`,
        },
      },
      display: "flex",
      flexDirection: "column",
    },
    wrapper: {
      color: error ? colooors["support-error"][3] : colooors["neutrals-01"][7],
      margin: 0,
      order: 1,
      paddingBottom: spaciiing["spacing-8"],
    },
  });
  return styles;
};
