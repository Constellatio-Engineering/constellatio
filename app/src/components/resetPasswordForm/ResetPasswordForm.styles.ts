import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
    max-width: 520px;
    background: ${theme.colors["neutrals-01"][0]};
`;
