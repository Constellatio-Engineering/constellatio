import { css } from "@emotion/react";

export const overlay = css`
  background-color: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(3px);
`;

export const content = css`
  height: 100%;
  background-color: transparent;
  box-shadow: none;
`;

export const body = css`
  height: 100%;
`;

export const imageWrapper = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

export const image = css`
  object-fit: cover; // this is redundant since the size is set by js but it's here as a fallback
  max-width: 100%;
  max-height: 100%;
  will-change: width, height;
`;
