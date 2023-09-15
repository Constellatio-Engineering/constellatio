import { colors } from "@/constants/styles/colors";

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
	max-width: 1440px;
	margin:0 auto;
	display: flex;
	align-items: center;
	padding: 0 ${theme.spacing["spacing-24"]};
	${variant === "simple" ? SimpleHeader : DefaultHeader}
	`;

export const SHeader = styled.header`
background: #fff;
	position: sticky;
	top: 0;
	z-index: 40;
`;
export const links = css`
display: flex;
	align-items: center;
	img{
		margin-right: 40px;
	}
a{
	margin-right: 16px;;
	color:black;
}
`;
