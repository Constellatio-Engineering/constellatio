import { css } from "@emotion/react";

export const wrapper = (sizeInPx: number, disableMarginAuto: boolean) => css`
  width: ${sizeInPx}px;
  height: ${sizeInPx}px;
  border-radius: 50%;
  background-color: transparent;
  overflow: hidden;
  margin: 0 ${disableMarginAuto ? "0px" : "auto"};
  svg {
    width: ${sizeInPx}px;
    height: ${sizeInPx}px;
  }
`;

export const image = css`
  object-position: center;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
