import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const contentWrapper = css``;

export const facts = (theme: MantineTheme) => css`
	max-width: 52.5%;
	padding-bottom: 12px;
	display: flex;
	flex-direction: column;
	gap: 24px;
	margin-bottom: 32px;
	border-bottom: 1px solid ${theme.colors["neutrals-01"][5]};
	> button {
		align-self: flex-start;
	}
	@media screen and (max-width: 1024px) {
		max-width: 100%;

	}
`;

export const content = css`
	position: relative;
	display: flex;
	justify-content: space-between;
	@media screen and (max-width: 1024px) {
		display: block;
	}
`;

export const toc = css`
	position: sticky;
	top: 104px;
	order: 1;
	height: max-content;
	margin: 24px;
	margin-left: auto;
	@media screen and (max-width: 1024px) {
		position: static;
		margin: 32px 0px;
	}
`;

export const fullTextAndTasksWrapper = css`
	max-width: 52.5%;
	/* padding: 0 44px; */
	padding: 0 ;
	@media screen and (max-width: 1024px) {
		max-width:100%;
	}
`;

export const componentWrapper = css`
	padding-bottom: 24px;
`;

export const gameComponentWrapper = css`
	padding-bottom: 72px;
`;
