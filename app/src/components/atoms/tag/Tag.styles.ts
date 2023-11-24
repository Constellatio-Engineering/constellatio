import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const tag = (theme: MantineTheme) => css`
	padding: 4px 12px;
	background: ${theme.colors["neutrals-01"][2]};
	border-radius: 40px;
	display: inline-block;
	white-space: nowrap;
	color: ${theme.colors["neutrals-02"][1]};
  * {
    font-size: 15px;
  }
`;
