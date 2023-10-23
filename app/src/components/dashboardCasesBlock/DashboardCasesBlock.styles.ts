import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
    background-color: ${theme.colors["neutrals-01"][0]};
    padding: 60px 32px 48px 32px;
    border-radius: 12px;
    border-top: 12px solid ${theme?.colors?.blue?.[2]};
    display:flex;
    gap:140px;
`;
