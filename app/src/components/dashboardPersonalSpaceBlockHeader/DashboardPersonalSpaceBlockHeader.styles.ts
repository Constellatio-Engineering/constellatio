import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = css`
border:1px solid green;
`;
export const headerTitle = (theme: MantineTheme) => css`
    color: ${theme.colors["neutrals-02"][1]};
`;
