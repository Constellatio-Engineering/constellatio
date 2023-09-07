import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { type MantineTheme } from "@mantine/styles";

const SimpleHeader = css`
	justify-content: center;
`;

const DefaultHeader = css`
	justify-content: space-between;
`;

export const wrapper = ({ theme, variant }: {
  theme: MantineTheme;
  variant: "default" | "simple";
}) => css`
	height: 72px;
	width: 100%;
	display: flex;
	align-items: center;
	padding: 0 ${theme.spacing["spacing-24"]};
	background: ${theme.colors["neutrals-01"][0]};
	${variant === "simple" ? SimpleHeader : DefaultHeader}
`;

export const SHeader = styled.header`
	background-color: transparent;
	position: sticky;
	top: 0;
	z-index: 40;
`;
