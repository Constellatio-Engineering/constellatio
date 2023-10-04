import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = css``;

export const headerWrapper = css``;

export const header = (theme: MantineTheme) => css`
	height: 240px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${theme.colors["brand-01"][4]};
	background-size: 100%;
	position: relative;

  > h2 {
    z-index: 1;
    color: ${theme.colors["neutrals-01"][0]};
  }
`;

export const headerBg = css`
	position: absolute;
	inset: 0;
  width: 100%;
  height: 100%;


	svg {
		height: 100%;
		width: 100%;
	}
`;

export const navBar = (theme: MantineTheme) => css`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
gap: 16px;
background-color: ${theme.colors["neutrals-01"][0]};
`;
