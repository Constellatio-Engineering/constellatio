import { colooors } from "@/constants/styles/colors";
import { spaciiing } from "@/constants/styles/spacing";

import {
  type AlertStylesNames, type AlertStylesParams, type CSSObject, type MantineTheme, type Styles
} from "@mantine/core";

type CardStyle = Styles<AlertStylesNames, AlertStylesParams>;

export const cardStyles = ({
  shouldUseFullWidth,
  stylesOverwrite,
  theme,
  variant
}: {
  shouldUseFullWidth?: boolean;
  stylesOverwrite?: CSSObject;
  theme: MantineTheme;
  variant: "error" | "success" | "warning";
}): CardStyle =>
{
  const styles: CardStyle = () => ({
    body: {
      flex: "initial",
    },
    icon: {
      color: variant === "success"
        ? colooors["support-success"][4]
        : variant === "warning"
          ? "#dda627"
          : colooors["support-error"][3],
      flex: "initial",
      height: spaciiing["spacing-24"],
      margin: 0,
      width: spaciiing["spacing-24"],
    },
    message: {
      color: variant === "success"
        ? colooors["support-success"][4]
        : variant === "warning"
          ? "#dda627"
          : colooors["support-error"][3],
      fontSize: theme.fontSizes["spacing-16"],
      fontWeight: 500,
      lineHeight: theme.fontSizes["spacing-24"],
    },
    root: {
      backgroundColor: variant === "success"
        ? colooors["support-success"][1]
        : variant === "warning"
          ? "#fdf3dc"
          : colooors["support-error"][1],
      borderRadius: theme.radius["radius-12"],
      maxWidth: shouldUseFullWidth ? "unset" : "440px",
      padding: `${spaciiing["spacing-16"]} ${spaciiing["spacing-20"]}`,
      width: shouldUseFullWidth ? "100%" : "unset",
      ...stylesOverwrite,
    },
    wrapper: {
      gap: spaciiing["spacing-12"],
      justifyContent: "center",
    },
  });
  return styles;
};
