import { colooors } from "@/constants/styles/colors";

import {
  type AlertStylesNames, type AlertStylesParams, type CSSObject, type MantineTheme, type Styles 
} from "@mantine/core";

type CardStyle = Styles<AlertStylesNames, AlertStylesParams>;

export const cardStyles = ({
  shouldUseFullWidth,
  stylesOverwrite,
  variant
}: {
  shouldUseFullWidth?: boolean;
  stylesOverwrite?: CSSObject;
  variant: "error" | "success";
}): CardStyle =>
{
  const styles: CardStyle = (theme: MantineTheme) => ({
    body: {
      flex: "initial",
    },
    icon: {
      color: variant === "success" ? colooors["support-success"][4] : colooors["support-error"][3],
      flex: "initial",
      height: theme.spacing["spacing-24"],
      margin: 0,
      width: theme.spacing["spacing-24"],
    },
    message: {
      color: variant === "success" ? colooors["support-success"][4] : colooors["support-error"][3],
      fontSize: theme.fontSizes["spacing-16"],
      fontWeight: 500,
      lineHeight: theme.fontSizes["spacing-24"],
    },
    root: {
      backgroundColor: variant === "success" ? colooors["support-success"][1] : colooors["support-error"][0],
      borderRadius: theme.radius["radius-12"],
      maxWidth: shouldUseFullWidth ? "unset" : "440px",
      padding: `${theme.spacing["spacing-16"]} ${theme.spacing["spacing-20"]}`,
      width: shouldUseFullWidth ? "100%" : "unset",
      ...stylesOverwrite,
    },
    wrapper: {
      gap: theme.spacing["spacing-12"],
      justifyContent: "center",
    },
  });
  return styles;
};
