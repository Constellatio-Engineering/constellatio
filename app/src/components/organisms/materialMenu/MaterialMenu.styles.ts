import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
    background-color: ${theme.colors["neutrals-01"][0]};
    border-radius: 12px;
    /* box-shadow color doesn't exist on Mantine Theme */
    box-shadow: 0px 8px 44px 0px rgba(0, 0, 0, 0.04);
    width: 312px;
    height: auto;
    max-height: 400px;
    /* overflow: hidden; */
`;
export const header = (theme: MantineTheme) => css`
    color:${theme.colors["neutrals-02"][1]};
    padding:24px  24px 24px 16px;
`;
export const content = css``;
export const callToAction = css`
    padding:16px 24px;
`;
