import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
    max-width: 280px;
    height: 160px;
    background: ${theme.colors["neutrals-01"][0]};
    border: 1px solid ${theme.colors["neutrals-01"][3]};
    border-radius: 12px;
    padding: 20px; 
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    &:hover{
        background: ${theme.colors["neutrals-01"][1]};
    }
    &:active{
        background: ${theme.colors["neutrals-01"][2]};
    }
`;
export const tag = css``;
