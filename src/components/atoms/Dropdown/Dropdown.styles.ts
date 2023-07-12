import { MantineTheme, SelectStylesNames, Styles } from "@mantine/core";
import { ReactNode } from "react";

export const dropdownStyles = ({ error, disabled }: { error: ReactNode; disabled?: boolean }) => {
  const styles: Styles<SelectStylesNames, Record<string, any>> = (theme: MantineTheme) => ({
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
          "::placeholder": {
            color: `${theme.colors["neutrals-02"][1]} !important`,
          },
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
        transition: "all 0.3s ease",
      },
      ":focus": {
        border: error
          ? `1px solid ${theme.colors["support-error"][3]} !important`
          : `1px solid ${theme.colors["neutrals-01"][8]} !important`,
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
    itemsWrapper: {},
    dropdown: {
      borderRadius: theme.radius["radius-12"],
      border: `1px solid ${theme.colors["neutrals-01"][3]}`,
      backgroundColor: theme.colors["neutrals-01"][0],
      boxShadow: "0px 8px 44px 0px rgba(0, 0, 0, 0.04)",
    },
    item: {
      backgroundColor: theme.colors["neutrals-01"][0],
      padding: `${theme.spacing["spacing-8"]} ${theme.spacing["spacing-16"]}`,
      borderBottom: `1px solid ${theme.colors["neutrals-01"][3]}`,
      color: theme.colors["neutrals-02"][1],
      "&[data-selected]": {
        color: `${theme.colors["neutrals-01"][0]}`,
      },
      "> div": {
        gap: theme.spacing["spacing-8"],
      },
    },
  });
  return styles;
};
