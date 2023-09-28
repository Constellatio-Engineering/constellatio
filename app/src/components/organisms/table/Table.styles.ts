import { css } from "@emotion/react";

export const table = css`
.primaryCell{
	width:100%;
}
	width: 100%;
	vertical-align: middle;

	> * {
		white-space: nowrap;
		min-width: max-content;
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
