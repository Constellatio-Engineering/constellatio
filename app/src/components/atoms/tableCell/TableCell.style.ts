import { colooors } from "@/constants/styles/colors";

import { css, type SerializedStyles } from "@emotion/react";

const CSSClickableEffect = () => css`
  &:hover {
	border-color: ${colooors["neutrals-01"][4]};
		background-color: ${colooors["neutrals-01"][1]};
  }
  &:active {
		border-color: ${colooors["neutrals-01"][3]};
		background-color: ${colooors["neutrals-01"][2]};
	}

	&:focus {
		border-color: ${colooors["neutrals-01"][4]};
		background-color: ${colooors["neutrals-01"][1]};
	}
	`;

export const wrapper = ({
  clickable,
  variant
}: {
  clickable?: boolean;
  variant: "titleTableCell" | "simpleTableCell";
}): SerializedStyles => css`
	cursor: ${variant === "titleTableCell" ? "pointer" : "default"};
	outline: none;
	border: none;
	width: 100%;
	display: flex;
	height: 60px;
	padding: 0 16px;
	align-items: center;
	gap: 8px;
	background-color: ${colooors["neutrals-01"][0]};
	color: ${variant === "titleTableCell"
    ? colooors["neutrals-02"][2]
    : colooors["neutrals-01"][9]};
	transition: border-color 0.3s ease-in, background-color 0.3s ease-in;

	${clickable && CSSClickableEffect()}

	
`;

export const iconWrapper = ({
  variant,
}: {
  variant: "titleTableCell" | "simpleTableCell";
}) => css`
	display: flex;
	align-items: center;
	justify-content: center;

	&,
	svg {
		width: ${variant === "titleTableCell" ? 20 : 16}px;
		height: ${variant === "titleTableCell" ? 20 : 16}px;
	}
`;
