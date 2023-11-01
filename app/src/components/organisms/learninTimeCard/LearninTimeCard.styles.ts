import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
    background-color: ${theme.colors["neutrals-01"][0]};
    width: 348px;
    padding: 12px;
    border-radius: 12px;
   
`;
