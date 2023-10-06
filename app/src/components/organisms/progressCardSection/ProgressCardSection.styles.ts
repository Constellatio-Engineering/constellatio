import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
    background: ${theme.colors["neutrals-01"][0]};
    margin-top: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 12px;
    overflow: hidden;
`;
