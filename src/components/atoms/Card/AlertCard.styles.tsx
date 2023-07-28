import { AlertStylesNames, AlertStylesParams, CSSObject, MantineTheme, Styles } from "@mantine/core";

export const cardStyles = ({
  variant,
  stylesOverwrite,
}: {
  variant: "error" | "success";
  stylesOverwrite?: CSSObject;
}) => {
  const styles: Styles<AlertStylesNames, AlertStylesParams> = (theme: MantineTheme) => ({
    root: {
      padding: `${theme.spacing["spacing-16"]} ${theme.spacing["spacing-20"]}`,
      maxWidth: "440px",
      borderRadius: theme.radius["radius-12"],
      backgroundColor: variant === "success" ? theme.colors["support-success"][1] : theme.colors["support-error"][0],
      ...stylesOverwrite,
    },
    message: {
      fontSize: theme.fontSizes["spacing-16"],
      lineHeight: theme.fontSizes["spacing-24"],
      fontWeight: 500,
      color: variant === "success" ? theme.colors["support-success"][4] : theme.colors["support-error"][3],
    },
    body: {
      flex: "initial",
    },
    icon: {
      color: variant === "success" ? theme.colors["support-success"][4] : theme.colors["support-error"][3],
      width: theme.spacing["spacing-24"],
      height: theme.spacing["spacing-24"],
      margin: 0,
      flex: "initial",
    },
    wrapper: {
      gap: theme.spacing["spacing-12"],
      justifyContent: "center",
    },
  });
  return styles;
};
