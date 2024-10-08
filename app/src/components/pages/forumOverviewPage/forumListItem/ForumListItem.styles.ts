import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = css`
  background-color: ${colooors["neutrals-01"][0]};
  border-radius: 12px;
  border: 1px solid ${colooors["neutrals-01"][4]};
  position: relative;
  overflow: hidden;
`;

export const wrapperCorrectAnswer = css`
  background-color: ${colooors["support-success"][4]};
  border-color: ${colooors["support-success"][4]};
`;

export const correctAnswerBanner = css`
  background-color: ${colooors["support-success"][4]};
  width: 100%;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  color: white;
  gap: 8px;
  span {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 15px;
  }
`;

export const checkIconWrapper = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  padding: 2px;
  svg path {
    fill: ${colooors["support-success"][4]};
    width: 100%;
    height: auto;
  }
`;

export const contentWrapper = css`
  padding: 24px;
`;

export const contentWrapperCorrectAnswer = css`
  background-color: ${colooors["support-success"][0]};
  border-radius: 12px 12px 0 0;
`;
