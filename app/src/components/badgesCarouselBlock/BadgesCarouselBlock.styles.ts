import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
    background-color: ${theme.colors["neutrals-01"][0]};
    border-radius: 12px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    /* max-width: 950px; */width: 70%;
`;
