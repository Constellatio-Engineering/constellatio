import { MantineTheme, Styles, TextInputStylesNames } from "@mantine/core";

export const fillGapInputStyles = ({ status }: { status: "default" | "success" | "error" }) => {
  const styles: Styles<TextInputStylesNames, Record<string, any>> = (theme: MantineTheme) => ({
    root: {
      display: "inline-block",
      paddingBottom: status === "error" ? theme.spacing["spacing-4"] : "0",
      paddingLeft: theme.spacing["spacing-2"],
      paddingRight: theme.spacing["spacing-2"],
      position: "relative",
      maxWidth: "140px",
      marginTop: theme.spacing["spacing-2"],
    },
    description: {
      position: "absolute",
      bottom: "-17px",
      left: "0",

      "> p": {
        color: theme.colors["neutrals-01"][7],
      },
    },
    wrapper: {
      "&:has(input:disabled) .mantine-Input-rightSection": {
        display: "flex",
      },
    },
    input: {
      border: "none",
      borderRadius: 0,
      display: "flex",
      alignItems: "flex-start",
      gap: theme.spacing["spacing-4"],
      padding: 0,
      paddingBottom: theme.spacing["spacing-4"],
      borderBottom: `1px solid ${
        status === "default"
          ? theme.colors["neutrals-01"][8]
          : status === "success"
          ? theme.colors["support-success"][4]
          : theme.colors["support-error"][3]
      }`,
      color:
        status === "default"
          ? theme.colors["neutrals-02"][1]
          : status === "success"
          ? theme.colors["support-success"][4]
          : theme.colors["support-error"][3],
      fontSize: theme.fontSizes["spacing-16"],
      lineHeight: "24px",
      fontWeight: 500,
      height: "auto",
      minHeight: "auto",
      backgroundColor: "transparent",

      "&:focus, &:focus-within": {
        borderColor: "initial",
      },

      "&[data-disabled], :disabled": {
        color:
          status === "default"
            ? theme.colors["neutrals-02"][1]
            : status === "success"
            ? theme.colors["support-success"][4]
            : theme.colors["support-error"][3],
        backgroundColor: "transparent",
        opacity: 1,
      },
    },
    rightSection: {
      width: 16,
      height: 16,
      top: "5px",
      color: status === "success" ? theme.colors["support-success"][4] : theme.colors["support-error"][3],
    },
  });
  return styles;
};
