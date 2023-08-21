import {
  type CSSObject, type CheckboxStylesNames, type CheckboxStylesParams, type MantineTheme, type Styles 
} from "@mantine/core";
import { type ReactNode } from "react";

export const checkboxStyles = ({
  checkboxBodyOverride,
  checkboxLabelOverride,
  disabled,
  error,
  fullWidth,
}: {
  checkboxBodyOverride?: CSSObject;
  checkboxLabelOverride?: CSSObject;
  disabled?: boolean;
  error: ReactNode;
  fullWidth?: boolean;
}) => 
{
  const styles: Styles<CheckboxStylesNames, CheckboxStylesParams> = (theme: MantineTheme) => ({
    body: {
      ...checkboxBodyOverride,
    },
    error: {
      color: theme.colors["support-error"][3],
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: theme.spacing["spacing-20"],
      marginTop: 0,
      paddingLeft: theme.spacing["spacing-8"],
    },
    icon: {
      color: disabled ? `${theme.colors["neutrals-01"][7]} !important` : `${theme.colors["neutrals-02"][1]} !important`,
      height: "10.5px",
      width: "10.5px",
    },
    inner: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      marginTop: theme.spacing["spacing-2"],
    },
    input: {
      ":checked": {
        backgroundColor: disabled ? theme.colors["neutrals-01"][3] : theme.colors["neutrals-01"][0],
        borderColor: !disabled ? theme.colors["neutrals-02"][1] : "",
      },
      ":hover": {
        borderColor: !disabled ? theme.colors["neutrals-02"][1] : "",
      },
      backgroundColor: theme.colors["neutrals-01"][0],
      border: error
        ? `1px solid ${theme.colors["support-error"][3]} !important`
        : `1px solid ${theme.colors["neutrals-01"][5]}`,
      borderRadius: theme.radius["radius-4"],
      height: "20px",
      transition: "border-color 0.3s ease",
      width: "20px",
    },
    label: {
      color: disabled ? theme.colors["neutrals-01"][7] : theme.colors["neutrals-02"][1],
      fontSize: theme.fontSizes["spacing-16"],
      fontWeight: 500,
      lineHeight: theme.spacing["spacing-24"],
      paddingLeft: theme.spacing["spacing-8"],
      ...checkboxLabelOverride,
    },
    labelWrapper: {
      width: fullWidth ? "100%" : "initial",
    },
    root: {},
  });
  return styles;
};
