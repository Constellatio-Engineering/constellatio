import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = css`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const copyTextWrapper = (theme: MantineTheme) => css`
    border: 1px solid ${theme.colors["neutrals-01"][3]};
    border-radius: 12px;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: ${theme.colors["neutrals-01"][0]};
    color: ${theme.colors["neutrals-02"][1]};
`;
