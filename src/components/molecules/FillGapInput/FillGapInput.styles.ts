import { type MantineTheme, type Styles, type TextInputStylesNames } from "@mantine/core";

export const fillGapInputStyles = ({ index, status }: { index?: number; status: "default" | "success" | "error" }) => 
{
  const styles: Styles<TextInputStylesNames, Record<string, any>> = (theme: MantineTheme) => ({
    input: {
      "&:focus, &:focus-within": {
        borderColor: "initial",
      },
      "&[data-disabled], :disabled": {
        backgroundColor: "transparent",
        color:
          status === "default"
            ? theme.colors["neutrals-02"][1]
            : status === "success"
              ? theme.colors["support-success"][4]
              : theme.colors["support-error"][3],
        opacity: 1,
      },
      alignItems: "flex-start",
      backgroundColor: "transparent",
      border: "none",
      borderBottom: `1px solid ${
        status === "default"
          ? theme.colors["neutrals-01"][8]
          : status === "success"
            ? theme.colors["support-success"][4]
            : theme.colors["support-error"][3]
      }`,
      borderRadius: 0,
      color:
        status === "default"
          ? theme.colors["neutrals-02"][1]
          : status === "success"
            ? theme.colors["support-success"][4]
            : theme.colors["support-error"][3],
      display: "flex",
      fontSize: theme.fontSizes["spacing-16"],
      fontWeight: 500,
      gap: theme.spacing["spacing-4"],
      height: "auto",
      lineHeight: "24px",
      minHeight: "auto",

      padding: 0,

      paddingBottom: theme.spacing["spacing-4"],
    },
    rightSection: {
      color: status === "success" ? theme.colors["support-success"][4] : theme.colors["support-error"][3],
      height: 16,
      top: "5px",
      width: 16,
    },
    root: {
      display: "inline-block",
      marginTop: theme.spacing["spacing-2"],
      maxWidth: "145px",
      paddingBottom: status === "error" ? theme.spacing["spacing-4"] : "0",
      paddingLeft: theme.spacing["spacing-2"],
      paddingRight: theme.spacing["spacing-2"],
      position: "relative",
    },
    wrapper: {
      "&::before": {
        alignItems: "center",
        border: `1px solid ${theme.colors["neutrals-02"][1]}`,
        borderRadius: "50%",
        content: index ? `"${index}"` : "''",
        display: status === "default" ? "none" : "flex",
        flexDirection: "column",
        fontSize: "14px",

        fontWeight: 700,
        height: "18px",
        justifyContent: "center",
        lineHeight: "20px",
        minWidth: "18px",
        textAlign: "center",
        textTransform: "uppercase",
        width: "18px",
      },
      "&:has(input:disabled) .mantine-Input-rightSection": {
        display: "flex",
      },
      alignItems: "center",

      display: "flex",

      gap: "8px",
    },
  });
  return styles;
};
