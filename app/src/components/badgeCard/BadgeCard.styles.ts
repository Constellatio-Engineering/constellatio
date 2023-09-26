import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding:24px;
    background: ${theme.colors["neutrals-01"][1]};
    border-radius: 12px;
    border:1px solid ${theme.colors["neutrals-01"][2]};
    gap:8px;
    cursor: pointer;
    .text{
        color: ${theme.colors["neutrals-01"][7]};
        text-align: center;
    }
`;
