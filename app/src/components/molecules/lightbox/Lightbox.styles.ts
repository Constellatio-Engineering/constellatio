import { css } from "@emotion/react";

export const overlay = css`
  background-color: rgba(0, 0, 0, 0.78);
  backdrop-filter: blur(4px);
  cursor: pointer;
`;

export const closeButtonWrapper = css`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  svg path {
    fill: rgba(255, 255, 255, 0.85);
  }
`;

export const content = css`
  height: 100%;
  background-color: transparent;
  box-shadow: none;
  cursor: pointer;
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
  cursor: default;
`;

export const fallbackImage = css`
  object-fit: contain;
  width: 100%;
  height: 100%;
  cursor: default;
`;
