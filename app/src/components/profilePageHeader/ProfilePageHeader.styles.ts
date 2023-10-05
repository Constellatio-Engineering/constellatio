import { css } from "@emotion/react";

export const wrapper = css`
  position: relative;
`;
export const headerImgs = css`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 3;
  img {
    &:nth-child(1) {
      position: absolute;
      right: 50px;
      top: 10px;
    }
    &:nth-child(2) {
      position: absolute;
      right: 50%;
      top: 120px;
    }
    &:nth-child(3) {
      position: absolute;
      left: -9%;
      top: -12%;
    }
  }
`;
