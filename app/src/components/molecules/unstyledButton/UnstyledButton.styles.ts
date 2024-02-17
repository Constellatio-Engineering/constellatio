import { css } from "@emotion/react";

export const wrapper = css`
  all: unset;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
  :disabled {
    cursor: not-allowed;
  }
  &:hover, &:active {
    opacity: 0.8;
  }
`;
