import { ButtonStylesNames, ButtonStylesParams, MantineTheme, Styles } from "@mantine/core";

export const floatingButtonStyles = ({
  variation,
  pinsNotificationsAmount,
}: {
  variation: "icon-big" | "icon-medium" | "pins" | "notes-notes" | "notes-no-notes";
  pinsNotificationsAmount?: number;
}) => {
  const styles: Styles<ButtonStylesNames, ButtonStylesParams> = (theme: MantineTheme) => ({
    root: {
      cursor: "pointer",
      boxShadow: theme.shadows["elevation-medium"],
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 0,
      border: "none",
      backgroundColor: "transparent",
      borderRadius: theme.radius["full"],
      transition: "all 0.3s ease",
      color: theme.colors["neutrals-02"][1],

      "> div": {
        ".mantine-Button-label": {
          display: "none",
          opacity: 0,
        },
      },

      "&:hover": {
        backgroundColor:
          variation === "pins" || variation === "notes-notes" || variation === "notes-no-notes"
            ? theme.colors["neutrals-01"][1]
            : "transparent",
        padding:
          variation === "pins" || variation === "notes-notes" || variation === "notes-no-notes"
            ? `${theme.spacing["spacing-4"]} ${theme.spacing["spacing-4"]} ${theme.spacing["spacing-4"]} ${theme.spacing["spacing-12"]}`
            : 0,

        "> div": {
          ".mantine-Button-label": {
            display:
              variation === "pins" || variation === "notes-notes" || variation === "notes-no-notes" ? "block" : "none",
            opacity: variation === "pins" || variation === "notes-notes" || variation === "notes-no-notes" ? 1 : 0,
          },

          ".mantine-Button-icon": {
            backgroundColor:
              variation === "icon-big" || variation === "icon-medium" ? theme.colors["neutrals-01"][2] : "",
            border: variation === "pins" ? `1px solid ${theme.colors["neutrals-01"][5]}` : "",
          },
        },
      },

      "&:active": {
        "> div .mantine-Button-icon": {
          backgroundColor:
            variation === "icon-big" || variation === "icon-medium" ? theme.colors["neutrals-01"][3] : "",
          border: variation === "pins" ? `1px solid ${theme.colors["neutrals-01"][5]}` : "",
        },
      },

      "&:disabled": {
        cursor: "default",
        "> div .mantine-Button-icon": {
          backgroundColor:
            variation === "icon-big" || variation === "icon-medium" ? theme.colors["neutrals-01"][4] : "",
          border: variation === "pins" ? `1px solid ${theme.colors["neutrals-01"][4]}` : "",
        },
      },
    },
    inner: {
      display: "flex",
      alignItems: "center",
      gap: theme.spacing["spacing-8"],
    },
    label: {
      transition: "all 0.3s ease",
    },
    icon: {
      width: variation === "icon-medium" ? "32px" : "40px",
      height: variation === "icon-medium" ? "32px" : "40px",
      borderRadius: "50%",
      border: variation !== "pins" ? `1px solid ${theme.colors["neutrals-01"][3]}` : "none",
      backgroundColor: variation === "pins" ? theme.colors["brand-01"][4] : theme.colors["neutrals-01"][0],
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.3s ease",
      position: "relative",

      "::after": {
        content: variation === "pins" ? `"${pinsNotificationsAmount}"` : '""',
        position: "absolute",
        top: "-4px",
        right: "-4px",
        width: "19px",
        height: "19px",
        borderRadius: "50%",
        display: variation === "pins" && pinsNotificationsAmount ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
        border: `2px solid ${theme.colors["neutrals-01"][3]}`,
        backgroundColor: theme.colors["neutrals-01"][0],
        color: theme.colors["neutrals-02"][1],
        fontSize: theme.spacing["spacing-14"],
        lineHeight: theme.spacing["spacing-20"],
        fontWeight: 700,
        textTransform: "uppercase",
      },

      svg: {
        width: variation === "icon-medium" ? "16px" : "20px",
        height: variation === "icon-medium" ? "16px" : "20px",
      },
    },
  });

  return styles;
};
