import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const tag = (theme: MantineTheme) => css`
	padding: 4px 12px;
	background: ${theme.colors["neutrals-01"][2]};
	border-radius: 40px;
	display: inline-block;
  font-size: 14px;
	white-space: nowrap;
	color: ${theme.colors["neutrals-01"][9]};
  * {
    font-size: inherit;
  }
`;

export const inlineTag = css`
  margin-right: 5px;
  margin-bottom: 4px;
  padding: 2px 10px;
`;
