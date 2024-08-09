import { css } from "@emotion/react";

const contentWrapperWidth = 92;

export const wrapper = css`
  width: ${contentWrapperWidth}%;
  max-width: 1440px;
  position: relative;
`;

export const positionLeftAndTransform = css`
  left: 50%;
  transform: translateX(-50%);
`;

export const marginAuto = css`
  margin: 0 auto;
`;
