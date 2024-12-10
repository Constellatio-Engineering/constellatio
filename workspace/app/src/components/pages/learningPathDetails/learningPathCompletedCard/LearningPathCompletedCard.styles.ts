import { css } from "@emotion/react";

export const wrapper = css`
  background-color: #EEF8F2;
  border: 1px solid #008D39;
  margin-bottom: 20px;
  color: #008D39;
  h1 {
    font-size: 28px;
  }
  p {
    font-size: 18px;
    line-height: 1.3;
  }
  @media screen and (max-width: ${1400}px) {
    h1 {
      font-size: 24px;
    }
    p {
      font-size: 16px;
    }
  }
`;

export const buttonWrapper = css`
  margin-top: 20px;
`;
