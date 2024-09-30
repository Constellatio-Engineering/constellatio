import { type SerializedStyles, css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme): SerializedStyles => css`
	cursor: default;
	display: flex;
	align-items: center;
	width: 100%;
	height: 60px;
	padding: 0 16px;
	gap: 8px;

	border: none;
	border-bottom: 1px solid ${colooors["neutrals-01"][3]};
	background-color: ${colooors["neutrals-01"][0]};
	transition: border-color 0.3s ease-in, background-color 0.3s ease-in;
`;
