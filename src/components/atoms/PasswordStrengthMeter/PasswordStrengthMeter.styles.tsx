import { type CSSObject, type MantineTheme } from "@mantine/core";
import { type ReactNode } from "react";

export const styles =
  ({
    disabled,
    error,
    isPasswordRevealed,
    meets,
  }: {
    disabled?: boolean;
    error: ReactNode;
    isPasswordRevealed: boolean;
    meets: boolean;
  }) =>
    (theme: MantineTheme): CSSObject => ({
      alignItems: "start",
      color: meets
        ? theme.colors["neutrals-01"][9]
        : !meets && error
          ? theme.colors["neutrals-02"][1]
          : theme.colors["neutrals-01"][7],
      display: disabled ? "none" : "flex",
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: theme.fontSizes["spacing-20"],
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
