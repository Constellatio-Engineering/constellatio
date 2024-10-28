import { css } from "@emotion/react";

export const wrapper = css`
  padding: 5vh 20px 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  height: 100svh;
  position: relative;
  background-color: #f5f5f5;
`;

export const logo = css`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 160px;
  height: auto;
`;

export const content = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  gap: 30px;
  * {
    text-align: center;
  }
  h1 {
    font-size: 36px;
  }
  p {
    line-height: 1.2;
    font-size: 22px;
    strong {
      display: block;
      margin-top: 10px;
    }
  }
`;
