import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";
export const wrapper = (theme: MantineTheme) => css`

    background-color: ${theme.colors["neutrals-01"][0]};
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 3;
    gap: 16px;
`;

