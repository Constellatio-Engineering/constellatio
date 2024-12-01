import { colooors } from "@/constants/styles/colors";
import { spaciiing } from "@/constants/styles/spacing";
import { type MantineCssObjectStyles } from "@/utils/types";

import { css } from "@emotion/react";
import {
  type CSSObject, type MantineTheme
} from "@mantine/core";

type CalloutStyles = MantineCssObjectStyles;

export const collapsedHeight = 100;

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

export const RichTextStyles = css`
  color: ${colooors["neutrals-01"][9]};
  h1, h2, h3, h4,  h5, h6 {
    padding-bottom: ${spaciiing["spacing-8"]};
  }
  p {
    padding-bottom: ${spaciiing["spacing-4"]};
  }
`;

export const contentWrapper = css`
  position: relative;
`;

export const contentWrapperExpandable = (isExpanded: boolean, contentHeight: number) => css`
  height: ${isExpanded ? contentHeight : collapsedHeight}px;
  transition: height 0.2s ease-in-out;
  will-change: height;
  overflow: hidden;
`;

export const fog = (isExpanded: boolean) => css`
  background: ${isExpanded ? "transparent" : "linear-gradient(180deg, rgba(255, 255, 255, 0)  0%, rgba(255, 255, 255, .66)  50%, rgba(255, 255, 255, 1) 100%)"};
  bottom: 0;
  display: ${isExpanded ? "none" : "block"};
  height: 50px;
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 1;
`;
