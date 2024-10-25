import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/core";

export const scrollToTopButtonStyles = (isVisible: boolean, theme: MantineTheme) => css`
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
  background-color: ${colooors["neutrals-01"][8]};
  transition: background-color 0.1s ease;
  animation: fadeFeedbackButtonIn 0.3s ease-in-out 2s forwards;
  opacity: 0;
  transition: background-color 0.1s ease, transform 0.3s ease;
  border-radius: ${theme.radius["radius-8"]} 0 0 ${theme.radius["radius-8"]};
  color: white;
  transform: translateX(${isVisible ? "0%" : "100%"});
  @keyframes fadeScrollToTopButtonIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  &:hover {
    background-color: ${colooors["neutrals-01"][7]};
  }
`;
