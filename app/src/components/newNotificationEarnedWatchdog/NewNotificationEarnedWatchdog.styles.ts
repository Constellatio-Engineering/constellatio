import { css } from "@emotion/react";

const imageSize = 200;

export const contentWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const imageWrapper = css`
  position: relative;
  width: ${imageSize}px;
  height: ${imageSize}px;
`;

export const image = css`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
