import { css } from "@emotion/react";

export const contentWrapper = css``;

export const facts = css`
	max-width: 52.5%;
	padding: 0 44px;

	display: flex;
	flex-direction: column;
	gap: 24px;

	> button {
		align-self: flex-start;
	}
`;

export const content = css`
	position: relative;
	display: flex;
	justify-content: space-between;
`;

export const toc = css`
	position: sticky;
	top: 104px;
	order: 1;
	height: max-content;
`;

export const fullTextAndTasksWrapper = css`
	max-width: 52.5%;
	padding: 0 44px;
`;

export const componentWrapper = css`
	padding-bottom: 24px;
`;

export const gameComponentWrapper = css`
	padding-bottom: 72px;
`;
