import { CheckboxStylesNames, CheckboxStylesParams, MantineTheme, Styles } from "@mantine/core";
import { ReactNode } from "react";

export const checkboxStyles = ({ error, disabled }: { error: ReactNode; disabled?: boolean }) => {
  const styles: Styles<CheckboxStylesNames, CheckboxStylesParams> = (theme: MantineTheme) => ({
    root: {},
    input: {
      width: "20px",
      height: "20px",
      borderRadius: theme.radius["radius-4"],
      backgroundColor: theme.colors["neutrals-01"][0],
      border: error
        ? `1px solid ${theme.colors["support-error"][3]} !important`
        : `1px solid ${theme.colors["neutrals-01"][5]}`,
      transition: "border-color 0.3s ease",
      ":checked": {
        backgroundColor: disabled ? theme.colors["neutrals-01"][3] : theme.colors["neutrals-01"][0],
        borderColor: !disabled ? theme.colors["neutrals-02"][1] : "",
      },
      ":hover": {
        borderColor: !disabled ? theme.colors["neutrals-02"][1] : "",
      },
    },
    error: {
      color: theme.colors["support-error"][3],
      fontSize: "14px",
      lineHeight: theme.spacing["spacing-20"],
      fontWeight: 500,
      marginTop: 0,
      paddingLeft: theme.spacing["spacing-8"],
    },
    label: {
      fontSize: theme.fontSizes["spacing-16"],
      lineHeight: theme.spacing["spacing-24"],
      fontWeight: 500,
      paddingLeft: theme.spacing["spacing-8"],
      color: disabled ? theme.colors["neutrals-01"][7] : theme.colors["neutrals-02"][1],
    },
    inner: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: theme.spacing["spacing-2"],
    },
    icon: {
      color: disabled ? `${theme.colors["neutrals-01"][7]} !important` : `${theme.colors["neutrals-02"][1]} !important`,
      width: "10.5px",
      height: "10.5px",
    },
  });
  return styles;
};
