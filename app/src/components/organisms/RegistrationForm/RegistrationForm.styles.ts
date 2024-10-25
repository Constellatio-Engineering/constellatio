import { css } from "@emotion/react";

export const dataLinkWrapper = css`
  width: 110%;
  cursor: pointer;
  font-weight: 500;
  a {
    color: inherit;
    white-space: wrap;
    font-size: inherit;
    font-weight: inherit;
  }
`;

export const waitingForConfirmation = css`
  font-size: 20px;
  margin-top: 16px;
  align-items: center;
  display: flex;
  font-style: italic;
  gap: 8px;
  justify-content: center;
`;

export const inlineLink = css`
  all: unset;
  text-decoration: underline;
  cursor: pointer;
`;
