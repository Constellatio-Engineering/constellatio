import { css } from "@emotion/react";
import { MantineTheme } from "@mantine/styles";

export const wrapper = css`
    margin-top: 54px; 
    width: 100%;
`;
export const title = (theme:MantineTheme) => css`
color: ${theme.colors["neutrals-02"][1]};
margin-bottom:32px;
`