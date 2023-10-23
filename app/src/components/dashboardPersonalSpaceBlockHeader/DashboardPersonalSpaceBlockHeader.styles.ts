import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = css`
    width: 204px;
`;
export const headerTitle = (theme: MantineTheme) => css`
    color: ${theme.colors["neutrals-02"][1]};
    margin-bottom: 32px;
`;
