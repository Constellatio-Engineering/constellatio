import { css } from "@emotion/react";

export const table = css`
	width: 100%;
	vertical-align: middle;

	> * {
		vertical-align: middle;
	}
`;

export const tableHeader = css`
	> * {
		&, > * {
			vertical-align: middle;
		}
	}
`;

export const tableBody = css`
	> * {
		&, > * {
			vertical-align: middle;
		}
	}
`;
