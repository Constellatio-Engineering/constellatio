import { colooors } from "@/constants/styles/colors";

import { css, type SerializedStyles } from "@emotion/react";

import { type IIconButtonProps } from "./IconButton";

export const wrapper = ({ size }: {
  size: IIconButtonProps["size"];
}): SerializedStyles => css`
  cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: ${size === "big" ? 4 : 0}px;
	padding: ${size === "big" ? 12 : 8}px;
	width: ${size === "big" ? 40 : 32}px;
	height: ${size === "big" ? 40 : 32}px;
	border-radius: 50%;
	border: 1px solid ${colooors["neutrals-01"][3]};
	background-color: ${colooors["neutrals-01"][0]};
	transition: border-color 0.3s ease-in, background-color 0.3s ease-in;

	&:hover {
		border-color: ${colooors["neutrals-01"][5]};
		background-color: ${colooors["neutrals-01"][2]};
	}

  &:disabled {
    color: initial;
  }
`;

export const disabledStyles = css`
  &:disabled {
    color: #9e9e9e;
    cursor: default;
    border-color: ${colooors["neutrals-01"][4]};
    background-color: ${colooors["neutrals-01"][2]};
  }
`;

export const icon = ({ size }: { size: IIconButtonProps["size"] }): SerializedStyles => css`
	display: flex;
	align-items: center;
	justify-content: center;

	&,
	svg {
		width: ${size === "big" ? 20 : 16}px;
		height: ${size === "big" ? 20 : 16}px;
	}
`;
