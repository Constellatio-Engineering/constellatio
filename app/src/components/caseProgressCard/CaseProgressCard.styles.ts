import { css } from "@emotion/react";
import { MantineTheme } from "@mantine/styles";

export const wrapper = (theme:MantineTheme) => css`
 width: 280px;
    height: 160px;
    background: ${theme.colors["neutrals-01"][0]};
    border: 1px solid ${theme.colors["neutrals-01"][3]};
    border-radius: 12px;
    padding: 20px; 
    display: flex;
`;
