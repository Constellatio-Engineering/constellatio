import { css } from "@emotion/react";
import { MantineTheme } from "@mantine/styles";

export const tag = (theme:MantineTheme) =>  css`
    padding:8px 16px;
    background: ${theme.colors["neutrals-01"][2]};
    border-radius:40px;
    display: inline-block;
`;
