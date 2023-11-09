import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const feedbackButtonStyles = (theme: MantineTheme) => css`
overflow:hidden;
    min-width: fit-content !important;/* TODO:: kp worans liegt läuft ned. */
    right: 0;
    white-space: nowrap;
    writing-mode: vertical-lr; 
    position: fixed;
    z-index: 99999;
    border: none;
    opacity: 0;
    cursor:pointer;
    animation: fadeIn 2s ease-in-out forwards;
    color: ${theme.white};
    bottom: ${theme.spacing["spacing-32"]};
    padding: ${theme.spacing["spacing-10"]};
    border-radius: ${theme.radius["radius-8"] } 0 0 ${theme.radius["radius-8"] };
 
    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;    

