import { colooors } from "@/constants/styles/colors";

import { css, type SerializedStyles } from "@emotion/react";

export const wrapper = (): SerializedStyles => css`
	cursor: default;
	display: flex;
	align-items: center;
	width: 100%;
	height: 60px;
	padding: 0 16px;
	gap: 8px;
	border: none;
	background-color: ${colooors["neutrals-01"][0]};
	transition: border-color 0.3s ease-in, background-color 0.3s ease-in;
`;
