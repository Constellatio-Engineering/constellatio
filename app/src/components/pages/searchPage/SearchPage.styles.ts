import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

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

export const header = () => css`
	height: 400px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${colooors["brand-01"][4]};
	background-size: 100%;
	position: relative;

	h2 {
    text-align: center;
		z-index: 1;
		color: ${colooors["neutrals-01"][0]};
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

export const headerContentWrapper = css`
  left: 0;
  transform: none;
`;

export const navBar = () => css`
	width: 100%;
	background-color: ${colooors["neutrals-01"][0]};
`;

export const navBarContentWrapper = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const filtersArea = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
  padding: 32px 0px;
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
	padding: 32px 0px;
`;

export const questionsWrapper = css`
  max-width: 920px;
  padding-top: 64px;
`;
