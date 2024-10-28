import { css } from "@emotion/react";

export const responsiveBreakpoint = 960;

export const wrapper = css`
  border-radius: 30px 0 0 30px;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: ${responsiveBreakpoint}px) {
    border-radius: 0;
  }
`;

export const socialButtonsWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const separatorWrapper = css`
  margin: 50px 0 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  :before {
    content: "";
    position: absolute;
    left: 0;
    top: 51%;
    transform: translateY(-50%);
    width: 100%;
    height: 1px;
    background-color: #c5c5c5;
  }

  span {
    position: relative;
    z-index: 1;
    background-color: #ffffff;
    padding: 0 16px;
    text-align: center;
    color: #8d8d8d;
    font-weight: 500;
  }
`;

export const footerWrapper = css`
  width: 100%;
  display: flex;
  padding: 16px 0 26px;
  justify-content: center;
  align-items: center;
  gap: 12px;

  a {
    font-size: 14px;
    color: #949494;
    font-weight: 500;
    transition: color 0.1s ease;

    :hover {
      color: #5e5e5e;
    }
  }
`;
