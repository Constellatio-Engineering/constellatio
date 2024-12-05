import type { cardStatusType } from "@/components/molecules/learningPathCard/LearningPathCard";

import { css } from "@emotion/react";

export const wrapper = (status: cardStatusType) => css`
    padding: 24px 12px;
    color: #000000;
    border: 2px solid ${status === "completed" ? "#0AA949" : "#F0F0F0"};
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: all 0.3s ease;
    word-break: break-word;

    :hover {
      cursor: pointer;
      background-color: #f8f8f8;
    }
`;

export const completed = css`
  border-color: #0AA949;
`;

export const iconWrapper = css`
  height: 110px;
  width: 110px;
  display: flex;
  background-color: lightgray;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;

export const preTitle = css`
  color: #949494;
  font-weight: 500;
  font-size: 15px;
  text-transform: uppercase;
`;

export const title = css`
  font-weight: 500;
  font-size: 20px;
  margin: 8px 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const statusLabelWrapper = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-end;
  min-height: 0;
  margin-top: 20px;
`;
