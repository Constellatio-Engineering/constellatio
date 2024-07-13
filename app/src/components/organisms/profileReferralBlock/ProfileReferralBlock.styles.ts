import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
	background: ${theme.colors["neutrals-01"][0]};
	border-radius: 12px;
	min-height: 300px;
	min-width: 100%;
	padding: 40px 32px 32px 28px;
	box-shadow: 0px 8px 44px 0px rgba(0, 0, 0, 0.04);
`;
