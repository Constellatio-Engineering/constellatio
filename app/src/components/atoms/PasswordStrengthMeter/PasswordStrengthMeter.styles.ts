import { colooors } from "@/constants/styles/colors";
import { type MantineCssObjectStyles } from "@/utils/types";

import { type ReactNode } from "react";

type PasswordStrengthMeterStylesProps = {
  disabled?: boolean;
  error: ReactNode;
  isPasswordRevealed: boolean;
  meets: boolean;
};

export const styles = ({
  disabled,
  error,
  isPasswordRevealed,
  meets,
}: PasswordStrengthMeterStylesProps): MantineCssObjectStyles => theme => ({
  alignItems: "start",
  color: meets
    ? colooors["neutrals-01"][9]
    : !meets && error
      ? colooors["neutrals-02"][1]
      : colooors["neutrals-01"][7],
  display: disabled ? "none" : "flex",
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: theme.fontSizes["spacing-20"],
  svg: {
    color: meets
      ? colooors["support-success"][4]
      : isPasswordRevealed
        ? colooors["neutrals-01"][7]
        : error
          ? colooors["support-error"][3]
          : colooors["support-error"][3],
  },
});
