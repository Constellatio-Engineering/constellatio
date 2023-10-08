import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
    background: ${theme.colors["neutrals-01"][0]};
    padding:32px 24px;
    height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex:1;
    min-width: 270px;
    border-right: 1px solid ${theme.colors["neutrals-01"][3]};
    &:hover{
        background-color: ${theme.colors["neutrals-01"][1]};
    };
    &:active{
        background-color: ${theme.colors["neutrals-01"][2]};
    };
`;
export const link = (theme: MantineTheme) => css`
    color: ${theme.colors["neutrals-01"][9]};
    svg{
        vertical-align:middle;
    }
`;
export const icon = (theme: MantineTheme) => css`
    display:grid;
    place-items: center;
    svg{
        width: 20px;
        height: 20px;
    }
    border-radius: 50%;
    background-color: ${theme.colors["neutrals-01"][0]};
    border: 1px solid ${theme.colors["neutrals-01"][3]};
    width: 40px;
    height: 40px;
`;
