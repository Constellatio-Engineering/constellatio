import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const tag = (theme: MantineTheme) => css`
	padding: 4px 12px;
	background: ${colooors["neutrals-01"][2]};
	border-radius: 40px;
	display: inline-block;
  font-size: 14px;
	white-space: nowrap;
	color: ${colooors["neutrals-01"][9]};
  transition: background 0.15s ease;
  &:hover {
    background: ${colooors["neutrals-01"][4]};
  }
  * {
    font-size: inherit;
  }
`;

export const inlineTag = css`
  margin-right: 5px;
  margin-bottom: 4px;
  padding: 2px 10px;
`;
