import { css } from "@emotion/react";
import { MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
    max-width: 520px;
    /* padding: 36px; */
    background: ${theme.colors['neutrals-01'][0]};
`;
