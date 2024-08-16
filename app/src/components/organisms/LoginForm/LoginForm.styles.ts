import { css } from "@emotion/react";

export const inlineTextButton = css`
  all: unset;
  text-decoration: underline;
  font-weight: 700;
  cursor: pointer;
  &:hover, &:active {
    text-decoration: none;
  }
`;

export const textButtonsWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;
