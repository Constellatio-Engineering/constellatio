import { colors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = css`
  background-color: ${colors["neutrals-01"][0]};
  border-radius: 12px;
  border: 1px solid ${colors["neutrals-01"][4]};
  overflow: hidden;
`;

export const wrapperCorrectAnswer = css`
  background-color: ${colors["support-success"][4]};
  border-color: ${colors["support-success"][4]};
`;

export const correctAnswerBanner = css`
  background-color: ${colors["support-success"][4]};
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
    fill: ${colors["support-success"][4]};
    width: 100%;
    height: auto;
  }
`;

export const contentWrapper = css`
  padding: 24px;
`;

export const contentWrapperCorrectAnswer = css`
  background-color: ${colors["support-success"][0]};
  border-radius: 12px 12px 0 0;
`;
