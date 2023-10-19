import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
    padding: 24px;
    border-radius: 12px;
    background: ${theme.colors["neutrals-01"][0]};
    box-shadow: 0px 8px 44px 0px rgba(0, 0, 0, 0.04);
    margin: 24px 0;
`;
