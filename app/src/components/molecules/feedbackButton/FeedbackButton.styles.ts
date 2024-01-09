import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const feedbackButtonStyles = (isUserLoggedIn: boolean, theme: MantineTheme) => css`
  overflow: hidden;
  height: auto;
  right: 0;
  white-space: nowrap;
  writing-mode: vertical-lr;
  position: fixed;
  z-index: 4;
  border: none;
  opacity: ${isUserLoggedIn ? 1 : 0};
  transition: opacity 0.3s ease-in-out 2s;
  cursor: pointer;
  bottom: 1rem;
  color: ${theme.white};
  padding: 16px 6px;
  border-radius: ${theme.radius["radius-8"]} 0 0 ${theme.radius["radius-8"]};
`;
