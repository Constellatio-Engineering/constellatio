import { css } from "@emotion/react";

export const wrapper = css`
  display: flex;
  > div {
    padding: 50px;
  }
`;

export const leftSide = css`
  flex: 1;
`;

export const title = css`
  font-weight: 400;
  margin-bottom: 30px;
`;

export const rightSide = css`
  width: 500px;
  background-color: #f5f5f5;
`;
