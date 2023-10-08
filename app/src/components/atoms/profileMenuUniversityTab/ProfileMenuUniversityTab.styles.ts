import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = css`
    padding: 12px 16px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 8px;
`;
export const text = css`
    overflow: hidden;
    width: 100%;
    p{
        overflow: hidden;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
}
`;
export const semesterText = (theme: MantineTheme) => css`
    color: ${theme.colors["neutrals-01"][7]};
`;
