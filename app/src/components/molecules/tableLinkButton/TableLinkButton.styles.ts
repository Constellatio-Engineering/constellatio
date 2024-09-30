import { colooors } from "@/constants/styles/colors";

import { css, type SerializedStyles } from "@emotion/react";

export const wrapper = (): SerializedStyles => css`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 60px;
	padding: 0 16px;
	gap: 8px;

	border-bottom: 1px solid ${colooors["neutrals-01"][3]};
	background-color: ${colooors["neutrals-01"][0]};
	transition: border-color 0.3s ease-in, background-color 0.3s ease-in;

	&:hover {
		border-color: ${colooors["neutrals-01"][4]};
		background-color: ${colooors["neutrals-01"][1]};
	}

	&:active {
		border-color: ${colooors["neutrals-01"][3]};
		background-color: ${colooors["neutrals-01"][2]};
	}

  &:focus-within{
    border-color: ${colooors["neutrals-01"][4]};
    background-color: ${colooors["neutrals-01"][1]};
  }
`;
