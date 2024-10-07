import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const cardsSmallerBreakpoint = 1100;
export const width = 160;
export const widthSmall = 130;

export const wrapper = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${colooors["neutrals-01"][0]};
  width: ${width}px;
  border-radius: 12px;
  padding: 18px;
  @media screen and (max-width: ${cardsSmallerBreakpoint}px) {
    width: ${widthSmall}px;
  }
`;

export const infoIconWrapper = css`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg path {
    fill: ${colooors["neutrals-01"][7]};
  }
`;

export const streakWrapper = css`
  display: flex;
  flex-direction: column;
`;

export const headerWrapper = css`
  display: flex;
  flex-direction: row;  
  gap: 4px;
  align-items: center;
`;

export const feuerWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const dayFireWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const numberAndEmojiWrapper = css`
  display: flex;
  align-items: center;
`;

export const streakNumberWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  order: 1;
  gap: 4px;
`;

export const fireEmojiWrapper = css`
  margin-right: 6px;
`;

export const streakText = css`
  font-size: 28px;
`;

export const streakTextSub = css`
  font-size: 16px;
`;

export const dayTextGrey = css`
  color: ${colooors["neutrals-01"][5]};
`;

export const headerText = css`
  font-size: 18px;
  font-weight: 700;
`;

export const fireEmoji = css`
  font-size: 24px;
`;
