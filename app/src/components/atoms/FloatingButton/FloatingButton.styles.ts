import { type FloatingButtonVariation } from "@/components/atoms/FloatingButton/FloatingButton";
import { colooors } from "@/constants/styles/colors";

import { type ButtonStylesNames, type ButtonStylesParams, type MantineTheme, type Styles } from "@mantine/core";

type FloatingButtonStyles = Styles<ButtonStylesNames, ButtonStylesParams>;

export const floatingButtonStyles = ({
  pinsNotificationsAmount,
  variation,
}: {
  pinsNotificationsAmount?: number;
  variation: FloatingButtonVariation;
}): FloatingButtonStyles =>
{
  const styles: FloatingButtonStyles = (theme: MantineTheme) => ({
    icon: {
      "::after": {
        alignItems: "center",
        backgroundColor: colooors["neutrals-01"][0],
        border: `2px solid ${colooors["neutrals-01"][3]}`,
        borderRadius: "50%",
        color: colooors["neutrals-02"][1],
        content: variation === "pins" ? `"${pinsNotificationsAmount}"` : "\"\"",
        display: variation === "pins" && pinsNotificationsAmount ? "flex" : "none",
        fontSize: theme.spacing["spacing-14"],
        fontWeight: 700,
        height: "19px",
        justifyContent: "center",
        lineHeight: theme.spacing["spacing-20"],
        position: "absolute",
        right: "-4px",
        textTransform: "uppercase",
        top: "-4px",
        width: "19px",
      },
      alignItems: "center",
      backgroundColor: variation === "pins" ? colooors["brand-01"][4] : colooors["neutrals-01"][0],
      border: variation !== "pins" ? `1px solid ${colooors["neutrals-01"][3]}` : "none",
      borderRadius: "50%",
      display: "flex",
      height: variation === "icon-medium" ? "32px" : "40px",
      justifyContent: "center",
      position: "relative",
      svg: {
        height: variation === "icon-medium" ? "16px" : "20px",
        width: variation === "icon-medium" ? "16px" : "20px",
      },
      transition: "all 0.3s ease",
      width: variation === "icon-medium" ? "32px" : "40px",
    },
    inner: {
      alignItems: "center",
      display: "flex",
      gap: theme.spacing["spacing-8"],
    },
    label: {
      transition: "all 0.3s ease",
    },
    root: {
      "&:active": {
        "> div .mantine-Button-icon": {
          backgroundColor:
            variation === "icon-big" || variation === "icon-medium" ? colooors["neutrals-01"][3] : "",
          border: variation === "pins" ? `1px solid ${colooors["neutrals-01"][5]}` : "",
        },
      },
      "&:disabled": {
        "> div .mantine-Button-icon": {
          backgroundColor:
            variation === "icon-big" || variation === "icon-medium" ? colooors["neutrals-01"][4] : "",
          border: variation === "pins" ? `1px solid ${colooors["neutrals-01"][4]}` : "",
        },
        cursor: "default",
      },
      "&:hover": {
        "> div": {
          ".mantine-Button-icon": {
            backgroundColor:
              variation === "icon-big" || variation === "icon-medium" ? colooors["neutrals-01"][2] : "",
            border: variation === "pins" ? `1px solid ${colooors["neutrals-01"][5]}` : "",
          },

          ".mantine-Button-label": {
            display:
              variation === "pins" || variation === "notes-notes" || variation === "notes-no-notes" ? "block" : "none",
            opacity: variation === "pins" || variation === "notes-notes" || variation === "notes-no-notes" ? 1 : 0,
          },
        },
        backgroundColor:
          variation === "pins" || variation === "notes-notes" || variation === "notes-no-notes"
            ? colooors["neutrals-01"][1]
            : "transparent",

        padding:
          variation === "pins" || variation === "notes-notes" || variation === "notes-no-notes"
            ? `${theme.spacing["spacing-4"]} ${theme.spacing["spacing-4"]} ${theme.spacing["spacing-4"]} ${theme.spacing["spacing-12"]}`
            : 0,
      },
      "> div": {
        ".mantine-Button-label": {
          display: "none",
          opacity: 0,
        },
      },
      alignItems: "center",
      backgroundColor: "transparent",
      border: "none",
      borderRadius: theme.radius.full,
      boxShadow: theme.shadows["elevation-medium"],
      color: colooors["neutrals-02"][1],
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      padding: 0,
      transition: "all 0.3s ease",
    },
  });

  return styles;
};
