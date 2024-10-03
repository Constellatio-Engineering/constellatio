import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/core";

export const feedbackButtonStyles = (isUserLoggedIn: boolean, theme: MantineTheme) => css`
  overflow: hidden;
  height: auto;
  right: 0;
  white-space: nowrap;
  writing-mode: vertical-lr;
  position: fixed;
  z-index: 4;
  border: none;
  outline: none;
  opacity: ${isUserLoggedIn ? 1 : 0};
  transition: opacity 0.3s ease-in-out 2s, background-color 0.1s ease;
  cursor: pointer;
  bottom: 5rem;
  color: #ffffff;
  padding: 16px 8px;
  border-radius: ${theme.radius["radius-8"]} 0 0 ${theme.radius["radius-8"]};
  background-color: #151515;

  &:hover {
    background-color: #2f2f2f;
  }
`;
