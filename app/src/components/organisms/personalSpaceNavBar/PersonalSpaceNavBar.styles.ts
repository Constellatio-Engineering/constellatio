import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`

    background-color: ${theme.colors["neutrals-01"][0]};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
`;

