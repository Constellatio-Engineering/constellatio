import { colors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = css`
  display: flex;
  position: relative;
  > div {
    padding: 40px;
  }
`;

export const closeButton = css`
  all: unset;
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  path {
    fill: ${colors["neutrals-01"][9]};
  }
`;

export const leftSide = css`
  flex: 1;
`;

export const title = css`
  margin-bottom: 30px;
  line-height: 40px;
`;

export const titleLeftSide = css`
  font-weight: 400;
`;

export const inputsWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const rightSide = css`
  width: 500px;
  background-color: #f5f5f5;
`;

export const titleRightSide = css`
  font-weight: 500;
  font-size: 18px;
`;

export const submitButton = css`
  display: block;
  margin-top: 30px;
  width: 100%;
`;
