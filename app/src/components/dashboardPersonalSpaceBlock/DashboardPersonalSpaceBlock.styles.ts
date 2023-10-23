import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = css`
display:flex;
justify-content: flex-start;
align-items: flex-start;
gap:140px;
`;
export const list = css`
margin-top: 24px;
display: flex;
gap: 16px;
flex-wrap: wrap;
`;
export const switcher = css`
width:min-content;
`;
export const emptyCard = (theme: MantineTheme) => css`
background-color: ${theme.colors["neutrals-01"][0]};
width: 100%;
`;
