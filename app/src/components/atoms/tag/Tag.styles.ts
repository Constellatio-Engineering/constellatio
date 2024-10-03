import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const tag = () => css`
	padding: 4px 12px;
	background: ${colooors["neutrals-01"][2]};
	border-radius: 40px;
	display: inline-block;
  font-size: 14px;
	white-space: nowrap;
	color: ${colooors["neutrals-01"][9]};
  transition: background 0.15s ease;
  &:hover {
    background: ${colooors["neutrals-01"][4]};
  }
  * {
    font-size: inherit;
  }
`;

export const inlineTag = css`
  margin-right: 5px;
  margin-bottom: 4px;
  padding: 2px 10px;
`;
