import { colors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const repliesWrapper = css`
  padding-left: 80px;
  > * {
    margin-top: 12px;
  }
`;

export const replyWrapper = css`
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: flex-end;
`;

export const listItemAddReplyButtonWrapper = css`
  padding: 0;
  border: 1px solid ${colors["neutrals-01"][5]};
`;

export const toggleRepliesButton = (isExpanded: boolean) => css`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0px;
  color: ${colors["neutrals-01"][9]};
  transition: opacity .2s ease;
  svg {
    fill: ${colors["neutrals-01"][9]};
    transform: rotate(${isExpanded ? 180 : 0}deg) translateY(${isExpanded ? 0 : 1}px);
  }
  &:hover, &:active {
    opacity: .8;
  }
`;

export const test = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
