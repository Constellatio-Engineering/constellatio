import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/core";

export const feedbackButtonStyles = (theme: MantineTheme) => css`
  overflow: hidden;
  height: auto;
  right: 0;
  white-space: nowrap;
  writing-mode: vertical-lr;
  position: fixed;
  z-index: 4;
  border: none;
  outline: none;
  transition: background-color 0.1s ease;
  animation: fadeFeedbackButtonIn 0.3s ease-in-out 2s forwards;
  opacity: 0;
  cursor: pointer;
  bottom: 5rem;
  color: #ffffff;
  padding: 16px 8px;
  border-radius: ${theme.radius["radius-8"]} 0 0 ${theme.radius["radius-8"]};
  background-color: #151515;
  @keyframes fadeFeedbackButtonIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  &:hover {
    background-color: #3f3f3f;
  }
`;
