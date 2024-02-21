import { type UnknownMantineStylesParams } from "@/utils/types";

import { type MultiSelectStylesNames, type Styles } from "@mantine/core";
import { type ReactNode } from "react";

type DropdownStyles = Styles<MultiSelectStylesNames, UnknownMantineStylesParams>;

export const dropdownMultiselectStyles = ({ disabled, error }: { disabled?: boolean; error: ReactNode }): DropdownStyles =>
{
  const styles: DropdownStyles = theme => ({
    description: {
      color: theme.colors["neutrals-01"][7],
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: theme.spacing["spacing-20"],
      order: 2,
    },
    dropdown: {
      backgroundColor: theme.colors["neutrals-01"][0],
      border: `1px solid ${theme.colors["neutrals-01"][3]}`,
      borderRadius: theme.radius["radius-12"],
      boxShadow: "0px 8px 44px 0px rgba(0, 0, 0, 0.04)",
    },
    error: {
      color: theme.colors["support-error"][3],
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: theme.spacing["spacing-20"],
      order: 3,
    },
    input: {
      ":focus-within": {
        border: error
          ? `1px solid ${theme.colors["support-error"][3]} !important`
          : `1px solid ${theme.colors["neutrals-01"][8]} !important`,
      },
      borderRadius: theme.radius["radius-8"]
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
    },
    option: {
      "&[data-selected]": {
        color: `${theme.colors["neutrals-01"][0]}`,
      },
      "> div": {
        gap: theme.spacing["spacing-8"],
      },
      backgroundColor: theme.colors["neutrals-01"][0],
      borderBottom: `1px solid ${theme.colors["neutrals-01"][3]}`,
      color: theme.colors["neutrals-02"][1],
      padding: `${theme.spacing["spacing-8"]} ${theme.spacing["spacing-16"]}`,
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
          color: error ? theme.colors["support-error"][3] : theme.colors["neutrals-02"][1]
        },
      },
      display: "flex",
      flexDirection: "column",
    },
    searchInput: {
      "&[data-disabled]": {
        backgroundColor: theme.colors["neutrals-01"][3],
      },
      "::placeholder": {
        color: `${theme.colors["neutrals-01"][7]} !important`,
        fontSize: theme.fontSizes["spacing-16"],
        fontWeight: 500,
        lineHeight: theme.spacing["spacing-24"],
        transition: "all 0.3s ease",
      },
      backgroundColor: theme.colors["neutrals-01"][0],
      borderRadius: theme.radius["radius-8"],
      color: `${theme.colors["neutrals-02"][1]} !important`,
      fontSize: theme.fontSizes["spacing-16"],
      fontWeight: 500,
      lineHeight: theme.spacing["spacing-24"],
      padding: `${theme.spacing["spacing-8"]} ${theme.spacing["spacing-4"]}`,
      transition: "all 0.3s ease",
    },
    wrapper: {
      color: error ? theme.colors["support-error"][3] : theme.colors["neutrals-01"][7],
      margin: 0,
      order: 1,
      paddingBottom: theme.spacing["spacing-2"],
    },
  });
  return styles;
};
