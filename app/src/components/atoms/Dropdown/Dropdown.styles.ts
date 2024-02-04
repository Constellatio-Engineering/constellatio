import { type UnknownMantineStylesParams } from "@/utils/types";

import { type SelectStylesNames, type Styles } from "@mantine/core";
import { type ReactNode } from "react";

type DropdownStyles = Styles<SelectStylesNames, UnknownMantineStylesParams>;

export const dropdownStyles = ({ disabled, error }: { disabled?: boolean; error: ReactNode }): DropdownStyles =>
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
    },
    item: {
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
    itemsWrapper: {},
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
          "::placeholder": {
            color: `${theme.colors["neutrals-02"][1]} !important`,
          },
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
