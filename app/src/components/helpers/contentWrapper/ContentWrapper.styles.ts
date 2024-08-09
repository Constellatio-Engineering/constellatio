import { css } from "@emotion/react";

const contentWrapperWidth = 92;

export const wrapper = css`
  width: ${contentWrapperWidth}%;
  max-width: 1440px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;
