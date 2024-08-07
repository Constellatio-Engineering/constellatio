import { css } from "@emotion/react";

export const wrapper = css`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: 50px;
	@media screen and (max-width: 1100px) {
		flex-direction: column;
	}
`;

export const textAreaWrapper = css`
	/* padding: 0 44px; */
  flex: 1;
	h2 {
		margin-bottom: 24px;
	}
	p {
		margin-bottom: 48px;
	}
`;

export const factsWrapper = css`
	max-width: 42%;
  min-width: 42%;
	/* padding: 8px 24px 16px 24px; */
	h2 {
		margin-bottom: 24px;
	}
	@media screen and (max-width: 1100px) {
		max-width: 100%;
	}
`;
