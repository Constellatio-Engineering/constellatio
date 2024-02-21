import { css } from "@emotion/react";

export const tagsWrapper = css`
  display: inline-flex;
  gap: 8px;
  flex: 1;
  min-width: 0;
`;

export const tagsWrapperSingleLine = css`
  flex-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const tagsWrapperMultiLine = css`
  flex-wrap: wrap;
`;
