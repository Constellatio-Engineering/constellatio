import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
    background: ${theme.colors["neutrals-01"][1]};
    padding: 4px 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    svg{
        color: ${theme.colors["neutrals-01"][7]};
    }
`;
