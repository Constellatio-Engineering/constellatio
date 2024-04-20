import { css } from "@emotion/react";

export const wrapper = css`
  height: 100vh;
  height: 100svh;
  width: 100vw;
  position: fixed;
  z-index: 99999999;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const imageWrapper = css`
  width: 90%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const image = css`
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.3));
`;
