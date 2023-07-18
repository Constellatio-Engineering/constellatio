import { CSSObject, MantineTheme } from "@mantine/core";
import { ReactNode } from "react";

export const styles =
  ({
    isPasswordRevealed,
    meets,
    error,
    disabled,
  }: {
    isPasswordRevealed: boolean;
    meets: boolean;
    error: ReactNode;
    disabled?: boolean;
  }) =>
  (theme: MantineTheme): CSSObject => ({
    display: disabled ? "none" : "flex",
    alignItems: "center",
    color: meets
      ? theme.colors["neutrals-01"][9]
      : !meets && error
      ? theme.colors["neutrals-02"][1]
      : theme.colors["neutrals-01"][7],
    fontSize: "14px",
    lineHeight: theme.fontSizes["spacing-20"],
    fontWeight: 500,
    svg: {
      color: meets
        ? theme.colors["support-success"][4]
        : isPasswordRevealed
        ? theme.colors["neutrals-01"][7]
        : error
        ? theme.colors["support-error"][3]
        : "",
    },
  });
