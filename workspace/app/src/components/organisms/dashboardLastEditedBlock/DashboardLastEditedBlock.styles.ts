import { css } from "@emotion/react";

export const wrapper = css`
  display:flex;
  justify-content: flex-start;
  align-items: stretch;
  gap:140px;

  @media screen and (max-width: 1200px) {
    gap:24px;
    flex-direction: column;
  }
`;

export const listWrapper = css`
  margin-top: 24px;
`;
