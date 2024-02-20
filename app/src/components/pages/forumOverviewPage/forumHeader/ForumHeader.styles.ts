import { css } from "@emotion/react";

export const imagesWrapper = css`
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  overflow: hidden;
`;

export const flag1 = css`
  position: absolute;
  right: 3%;
  top: 70px;
  width: 230px;
  height: auto;
`;

export const flag2 = css`
  position: absolute;
  left: 4%;
  bottom: -50px;
  width: 250px;
  height: auto;
`;

export const contentWrapper = css`
  display: flex;
  position: relative;
  z-index: 3;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  * {
    text-align: center;
  }
`;

export const text = css`
  font-size: 18px;
  max-width: 900px;
  margin-top: 20px;
`;

export const button = css`
  margin-top: 30px;
`;
