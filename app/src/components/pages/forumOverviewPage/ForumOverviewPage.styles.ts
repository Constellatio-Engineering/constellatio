import { colors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = css`
  padding-top: 60px;
  max-width: 1040px;
`;

export const questionsWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const questionContentWrapper = css`
  display: flex;
  gap: 24px;
`;

export const upvoteColumn = css`
  width: 24px;
  min-width: 24px;
  padding-top: 6px;
`;

export const contentColumn = css`
  flex: 1;
  min-width: 0;
`;

export const titleWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`;

export const titleAndCheckmarkWrapper = css`
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
`;

export const title = css`
  white-space: nowrap;
  word-break: keep-all;
  text-overflow: ellipsis;
  font-weight: 400;
  font-size: 24px;
  min-width: 0;
  overflow: hidden;
`;

export const checkmark = css`
  width: 22px;
  height: 22px;
  min-width: 22px;
  min-height: 22px;
  background-color: ${colors["brand-01"][4]};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: white;
  svg {
    transform: translateX(-1px) scale(1.1);
  }
`;

export const bookmarkButtonWrapper = css`
  min-width: max-content;
  padding-left: 40px;
`;
