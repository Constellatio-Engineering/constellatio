import { colors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = css`
  display: flex;
  flex-direction: column;
  gap: 2px;
  background-color: ${colors["neutrals-01"][0]};
  width: fit-content;
  border-radius: 12px;
  padding: 9px 18px 18px 18px;
`;

export const streakWrapper = css`
  display: flex;
  flex-direction: row;
`;

export const headerWrapper = css`
  display: flex;
  flex-direction: row;  
  gap: 2px;
`;

export const feuerWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 210px;
  padding-right: 12px;
`;

export const dayFireWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const streakNumberWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-left: 1px solid ${colors["neutrals-01"][7]};
  padding-left: 12px;
`;

export const fireEmojiWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 6px;
`;

export const streakText = css`
  font-size: 28px;
`;

export const streakTextSub = css`
  font-size: 16px;
`;

export const dayTextGrey = css`
  color: ${colors["neutrals-01"][5]};
`;

export const headerText = css`
  font-size: 18px;
  padding-bottom: 6px;
  font-weight: 700;
`;

export const fireEmoji = css`
  font-size: 45px;
`;
