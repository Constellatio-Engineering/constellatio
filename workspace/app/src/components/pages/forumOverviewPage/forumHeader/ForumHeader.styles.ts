import { css } from "@emotion/react";

export const imagesWrapper = css`
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  overflow: hidden;
  opacity: .7;
`;

export const flag1 = css`
  position: absolute;
  right: 3%;
  top: 70px;
  width: 230px;
  height: auto;
  @media screen and (max-width: ${1500}px) {
    right: 1%;
    top: 50px;
  }
  @media screen and (max-width: ${1300}px) {
    right: -5%;
    width: 200px;
  }
  @media screen and (max-width: ${1050}px) {
    right: -4%;
    top: 10px;
    width: 180px;
  }
`;

export const flag2 = css`
  position: absolute;
  left: 4%;
  bottom: -50px;
  width: 220px;
  height: auto;
  @media screen and (max-width: ${1300}px) {
    left: 2%;
    bottom: -60px;
  }
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
