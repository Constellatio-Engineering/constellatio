import { colors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const questionWrapper = css`
  background-color: ${colors["cc-forum"][2]};
`;

export const contentWrapper = css`
  max-width: 920px;
`;

export const forumListItem = css`
  transform: translateY(100px);
  position: relative;
  box-shadow: 0 8px 44px rgba(0, 0, 0, 0.04);
  padding: 24px;
`;

export const yellowTopBar = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 8px;
  background-color: ${colors["cc-forum"][3]};
`;

export const questionContentWrapper = css`
  display: flex;
  gap: 24px;
  background-color: white;
`;

export const upvoteColumn = css`
  width: 24px;
  min-width: 24px;
  padding-top: 6px;
`;

export const contentColumn = css`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

export const titleWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  margin-bottom: 12px;
`;

export const title = css`
  white-space: nowrap;
  word-break: keep-all;
  text-overflow: ellipsis;
  font-weight: 700;
  font-size: 28px;
  min-width: 0;
  overflow: hidden;
`;

export const bookmarkButtonWrapper = css`
  min-width: max-content;
  padding-left: 40px;
`;

export const authorAndDateWrapper = css`
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 14px;
  margin: 40px 0;
`;

export const authorAndDateSeparator = css`
  height: 20px;
  width: 1px;
  background-color: ${colors["neutrals-01"][5]};
`;

export const date = css`
  color: ${colors["neutrals-01"][7]};
`;

export const tagsWrapper = css`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex: 1;
  min-width: 0;
`;

export const answersCountWrapper = css`
  min-width: max-content;
  padding-left: 50px;
  height: 28px;
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: flex-end;
  color: ${colors["neutrals-01"][9]};
  font-weight: 500;
  svg {
    transform: translateY(1px);
  }
`;

export const answersWrapper = css`
  padding-top: 160px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const postAnswerFormWrapper = css`
  padding: 0;
`;

export const answerWrapper = css`
  
`;

export const test = css`
  width: 80%;
  background-color: #d1d1d1;
  height: 1px;
  margin: 20px auto;
`;
