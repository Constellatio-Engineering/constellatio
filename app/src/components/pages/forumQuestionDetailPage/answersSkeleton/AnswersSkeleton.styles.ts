import { css } from "@emotion/react";

export const wrapper = css`
  position: relative;
  padding-left: 46px;
`;

export const upvotes = css`
  position: absolute;
  top: 0px;
  left: 0px;
`;

export const authorAndDate = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  width: 100%;
`;

export const author = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const replyWrapper = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 24px;
`;
