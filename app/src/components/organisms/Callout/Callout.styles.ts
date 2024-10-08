import { colooors } from "@/constants/styles/colors";
import { spaciiing } from "@/constants/styles/spacing";
import { type MantineCssObjectStyles } from "@/utils/types";

import { css } from "@emotion/react";
import {
  type CSSObject, type MantineTheme, type SpoilerStylesNames, type SpoilerStylesParams, type Styles
} from "@mantine/core";

export const RichTextStyles = css`
  color: ${colooors["neutrals-01"][9]};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    padding-bottom: ${spaciiing["spacing-8"]};
  }

  p {
    padding-bottom: ${spaciiing["spacing-4"]};
  }
`;

type SpoilerStyles = Styles<SpoilerStylesNames, SpoilerStylesParams>;

export const spoilerStyles = ({ isContentHide }: { isContentHide: boolean }): SpoilerStyles =>
{
  const styles: SpoilerStyles = () => ({
    control: {
      marginTop: isContentHide ? -4 : spaciiing["spacing-22"],
    },
    root: {
      ":before": {
        background: isContentHide
          ? "linear-gradient(360deg, #fff  64%, rgba(255, 255, 255, 0) 100%)"
          : "transparent",
        bottom: 0,
        content: "''",
        display: isContentHide ? "block" : "none",
        height: "90px",
        position: "absolute",
        width: "100%",
        zIndex: 1,
      },
    }
  });

  return styles;
};

type CalloutStyles = MantineCssObjectStyles;

export const calloutStyles = (theme: MantineTheme): CalloutStyles =>
{
  const styles = (): CSSObject => ({
    backgroundColor: colooors["neutrals-01"][0],
    borderRadius: theme.radius["radius-12"],
    borderTop: `8px solid ${colooors["support-warning"][2]}`,
    padding: spaciiing["spacing-24"],
  });
  return styles;
};
