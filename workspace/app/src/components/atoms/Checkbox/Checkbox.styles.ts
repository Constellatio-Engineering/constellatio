import { colooors } from "@/constants/styles/colors";
import { spaciiing } from "@/constants/styles/spacing";

import { type CheckboxStylesNames, type CheckboxStylesParams, type CSSObject, type Styles } from "@mantine/core";
import { type ReactNode } from "react";

type CheckboxStylesProps = {

  checkboxBodyOverride?: CSSObject;
  checkboxLabelOverride?: CSSObject;
  disabled?: boolean;
  error: ReactNode;
  fullWidth?: boolean;
};

type CheckboxStyles = Styles<CheckboxStylesNames, CheckboxStylesParams>;

export const checkboxStyles = ({
  checkboxBodyOverride,
  checkboxLabelOverride,
  disabled,
  error,
  fullWidth,
}: CheckboxStylesProps): CheckboxStyles =>
{
  const styles: CheckboxStyles = theme => ({
    body: {
      ...checkboxBodyOverride,
    },
    error: {
      color: colooors["support-error"][3],
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: spaciiing["spacing-20"],
      marginTop: 0,
      paddingLeft: spaciiing["spacing-8"],
    },
    icon: {
      color: disabled ? `${colooors["neutrals-01"][7]} !important` : `${colooors["neutrals-02"][1]} !important`,
      height: "10.5px",
      width: "10.5px",
    },
    inner: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      marginTop: spaciiing["spacing-2"],
    },
    input: {
      ":checked": {
        backgroundColor: disabled ? colooors["neutrals-01"][3] : colooors["neutrals-01"][0],
        borderColor: !disabled ? colooors["neutrals-02"][1] : "",
      },
      ":hover": {
        borderColor: !disabled ? colooors["neutrals-02"][1] : "",
      },
      backgroundColor: colooors["neutrals-01"][0],
      border: error
        ? `1px solid ${colooors["support-error"][3]} !important`
        : `1px solid ${colooors["neutrals-01"][5]}`,
      borderRadius: theme.radius["radius-4"],
      cursor: "pointer",
      height: "20px",
      transition: "border-color 0.3s ease",
      width: "20px"
    },
    label: {
      color: disabled ? colooors["neutrals-01"][7] : colooors["neutrals-02"][1],
      fontSize: theme.fontSizes["spacing-16"],
      fontWeight: 500,
      lineHeight: spaciiing["spacing-24"],
      paddingLeft: spaciiing["spacing-8"],
      ...checkboxLabelOverride,
    },
    labelWrapper: {
      width: fullWidth ? "100%" : "initial",
    },
    root: {},
  });
  return styles;
};
