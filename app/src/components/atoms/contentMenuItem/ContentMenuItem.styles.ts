import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = ({ opened, theme }: {
  opened?: boolean;
  theme: MantineTheme;
}) => css`
	background-color: ${theme.colors["neutrals-01"][0]};
	padding: 12px 24px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	/* outline: 1px solid red; */
	border-bottom: 1px solid ${theme.colors["neutrals-01"][4]};
	&:hover {
		background: ${theme.colors["neutrals-01"][1]};
	}
	border-left: ${opened ? "3px solid black" : "none"};
	cursor: pointer;
`;
export const title = css`
	/* outline: 1px solid red; */
`;
export const text = ({ opened, theme }: {
  opened?: boolean;
  theme: MantineTheme;
}) => css`
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${opened
    ? theme.colors["neutrals-02"][1]
    : theme.colors["neutrals-01"][9]};
	svg {
		color: inherit;
		${opened && "transform:rotate(90deg);"}
	}
`;
export const counter = (theme: MantineTheme) => css`
	color: ${theme.colors["neutrals-01"][7]};
`;
