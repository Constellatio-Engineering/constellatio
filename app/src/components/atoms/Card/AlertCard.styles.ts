import {
  type AlertStylesNames, type AlertStylesParams, type CSSObject, type MantineTheme, type Styles 
} from "@mantine/core";

type CardStyle = Styles<AlertStylesNames, AlertStylesParams>;

export const cardStyles = ({ stylesOverwrite, variant }: {
  stylesOverwrite?: CSSObject;
  variant: "error" | "success";
}): CardStyle =>
{
  const styles: CardStyle = (theme: MantineTheme) => ({
    body: {
      flex: "initial",
    },
    icon: {
      color: variant === "success" ? theme.colors["support-success"][4] : theme.colors["support-error"][3],
      flex: "initial",
      height: theme.spacing["spacing-24"],
      margin: 0,
      width: theme.spacing["spacing-24"],
    },
    message: {
      color: variant === "success" ? theme.colors["support-success"][4] : theme.colors["support-error"][3],
      fontSize: theme.fontSizes["spacing-16"],
      fontWeight: 500,
      lineHeight: theme.fontSizes["spacing-24"],
    },
    root: {
      backgroundColor: variant === "success" ? theme.colors["support-success"][1] : theme.colors["support-error"][0],
      borderRadius: theme.radius["radius-12"],
      maxWidth: "440px",
      padding: `${theme.spacing["spacing-16"]} ${theme.spacing["spacing-20"]}`,
      ...stylesOverwrite,
    },
    wrapper: {
      gap: theme.spacing["spacing-12"],
      justifyContent: "center",
    },
  });
  return styles;
};
