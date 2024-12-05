import { type cardStatusType } from "@/components/molecules/learningPathCard/LearningPathCard";

import { css } from "@emotion/react";

export const wrapper = (status: cardStatusType) => css`
  color: inherit;
  background-color: ${status === "upcoming" ? "transparent" : "#F9F9F9"};
  border: 2px solid ${status === "completed" ? "#0AA949" : "#F0F0F0"};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 18px;
  width: 240px;
  text-align: center;
  height: 100%;
`;

export const iconWrapper = css`
  margin-bottom: 12px;
`;

export const iconWrapperCompleted = css`
  transform: translateX(5px);
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
