import { css } from "@emotion/react";

export const wwwrapper = css`
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
    &:nth-of-type(1) {
      position: absolute;
      right: 50px;
      top: 10px;
    }

    &:nth-of-type(2) {
      position: absolute;
      right: 50%;
      top: 120px;
    }

    &:nth-of-type(3) {
      position: absolute;
      left: -5%;
      top: -12%;
    }
  }
`;
