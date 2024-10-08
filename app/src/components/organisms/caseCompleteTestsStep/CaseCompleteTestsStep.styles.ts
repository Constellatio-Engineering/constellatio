import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const contentWrapper = css`
`;

export const facts = () => css`
	max-width: 52.5%;
	padding-bottom: 12px;
	display: flex;
	flex-direction: column;
	gap: 24px;
	margin-bottom: 32px;
	border-bottom: 1px solid ${colooors["neutrals-01"][5]};
	> button {
		align-self: flex-start;
	}
	@media screen and (max-width: 1100px) {
		max-width: 100%;

	}
`;

export const content = css`
	position: relative;
	display: flex;
	justify-content: space-between;
	@media screen and (max-width: 1100px) {
		display: block;
	}
`;

export const toc = css`
	position: sticky;
	top: 150px;
	order: 1;
	height: max-content;
	margin: 24px 0 24px auto;
	@media screen and (max-width: 1100px) {
		display: none;
	}
`;

export const fullTextAndTasksWrapper = css`
	max-width: 58%;
	/* padding: 0 44px; */
	padding: 0 ;
	@media screen and (max-width: 1100px) {
		max-width:100%;
	}
`;

export const componentWrapper = css`
	padding-bottom: 24px;
`;
