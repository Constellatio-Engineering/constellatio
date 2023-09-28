import { css } from "@emotion/react";

export const table = css`
  .primaryCell{
    width: 100%;
    max-width: 500px;
    overflow: hidden;
    p{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
	width: 100%;
	vertical-align: middle;

	> * {
    
		vertical-align: middle;
    white-space: nowrap;
    min-width: max-content;
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
