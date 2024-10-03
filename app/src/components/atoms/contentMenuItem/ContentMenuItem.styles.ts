import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = ({ opened }: {
  opened?: boolean;
}) => css`
	background-color: ${colooors["neutrals-01"][0]};
	padding: 12px 24px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	/* outline: 1px solid red; */
	border-bottom: 1px solid ${colooors["neutrals-01"][4]};
	&:hover {
		background: ${colooors["neutrals-01"][1]};
	}
	border-left: ${opened ? "3px solid black" : "none"};
	cursor: pointer;
`;
export const title = css`
	/* outline: 1px solid red; */
`;
export const text = ({ opened }: {
  opened?: boolean;
}) => css`
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${opened
    ? colooors["neutrals-02"][1]
    : colooors["neutrals-01"][9]};
	svg {
		color: inherit;
		${opened && "transform:rotate(90deg);"}
	}
`;
export const counter = () => css`
	color: ${colooors["neutrals-01"][7]};
`;
