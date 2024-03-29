import { type SerializedStyles, css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

const CSSClickableEffect = (theme: MantineTheme) => css`
  &:hover {
	border-color: ${theme.colors["neutrals-01"][4]};
		background-color: ${theme.colors["neutrals-01"][1]};
  }
  &:active {
		border-color: ${theme.colors["neutrals-01"][3]};
		background-color: ${theme.colors["neutrals-01"][2]};
	}

	&:focus {
		border-color: ${theme.colors["neutrals-01"][4]};
		background-color: ${theme.colors["neutrals-01"][1]};
	}
	`;

export const wrapper = ({
  clickable,
  theme,
  variant
}: {
  clickable?: boolean;
  theme: MantineTheme;
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
	border-bottom: 1px solid ${theme.colors["neutrals-01"][3]};
	background-color: ${theme.colors["neutrals-01"][0]};
	color: ${variant === "titleTableCell"
    ? theme.colors["neutrals-02"][2]
    : theme.colors["neutrals-01"][9]};
	transition: border-color 0.3s ease-in, background-color 0.3s ease-in;

	${clickable && CSSClickableEffect(theme)}

	
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
