import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
        background: ${theme.colors["neutrals-01"][0]};
        border-radius:12px;
        margin-bottom: 40px;
        border:1px solid ${theme.colors["neutrals-01"][2]};
`;
export const papersBlockHead = (theme: MantineTheme) => css`
    color: ${theme.colors["neutrals-02"][0]};
    span{
        color: ${theme.colors["neutrals-01"][7]};
    }
        padding:24px;
    border-bottom: 1px solid ${theme.colors["neutrals-01"][2]};
`;
export const papersBlockTable = css`
padding:24px;
`;
