import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = css``;

export const headerWrapper = css``;

export const loadingWrapper = css`
  height: 30vh;
  height: 30svh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const header = (theme: MantineTheme) => css`
	height: 400px;
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

export const filtersArea = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
  padding: 32px 60px;
`;

export const selectedFiltersArea = css`
	flex: 0.7;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 8px;
	flex-wrap: wrap;
`;

export const searchPageResults = css`
	/* border: 4px solid red; */
	max-width: 1440px;
	margin: 0 auto;
	padding: 32px 60px;
`;

export const questionsWrapper = css`
  width: 95%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  max-width: 920px;
  padding-top: 64px;
`;
