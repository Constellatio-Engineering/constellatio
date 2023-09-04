import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
width: 422px;
padding:20px 16px;
background-color: ${theme.colors["neutrals-01"][0]};
border-radius: 12px;
`;
