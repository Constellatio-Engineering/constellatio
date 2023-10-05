import { css } from "@emotion/react";
import { MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
    background: ${theme.colors["neutrals-01"][0]};
    border-radius: 12px;
    min-height: 300px;
    min-width: 100%;
    padding: 40px 32px 32px 28px;
`;
export const blockHead = (theme: MantineTheme) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    /* outline:1px solid; */
`;
export const blockHeadText = (theme: MantineTheme) => css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
`;
export const blockHeadDescription = (theme: MantineTheme) => css`
    color: ${theme.colors["neutrals-01"][7]};
`;
export const blockHeadTitle = css``;
export const blockHeadIcon = css`
pointer-events:none;
`;
export const blockHeadCallToAction = (theme: MantineTheme) => css``;
