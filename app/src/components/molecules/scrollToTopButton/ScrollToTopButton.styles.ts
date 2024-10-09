import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/core";

export const scrollToTopButtonStyles = (theme: MantineTheme) => css`
    overflow: hidden;
    width: 32px;
    height: 32px;
    right: 0;
    position: fixed;
    z-index: 4;
    border: none;
    outline: none;
    cursor: pointer;
    bottom: 12rem;
    background-color: ${colooors["brand-01"][4]};
    border-radius: ${theme.radius["radius-8"]} 0 0 ${theme.radius["radius-8"]};
    color: white;

    &:hover {
        opacity: .8;
    }
`;
