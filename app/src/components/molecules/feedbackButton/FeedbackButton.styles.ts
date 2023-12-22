import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const feedbackButtonStyles = (theme: MantineTheme) => css`
  overflow: hidden;
  height: auto;
  right: 0;
  white-space: nowrap;
  writing-mode: vertical-lr;
  position: fixed;
  z-index: 1;
  border: none;
  opacity: 0;
  cursor: pointer;
  bottom: 1rem;
  animation: fadeIn 2s ease-in-out forwards;
  color: ${theme.white};
  padding: 16px 6px;
  border-radius: ${theme.radius["radius-8"]} 0 0 ${theme.radius["radius-8"]};

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;    

