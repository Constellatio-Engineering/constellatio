import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = css`
    width: 204px;
    @media screen and (max-width: 1200px) {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export const headerTitle = (theme: MantineTheme) => css`
    color: ${theme.colors["neutrals-02"][1]};
    margin-bottom: 32px;
    @media screen and (max-width: 1200px) {
        margin-bottom: 0;
    }
`;
