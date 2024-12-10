import { type LearningPathProgressState } from "@/hooks/useLearningPathProgress";

import { css } from "@emotion/react";

export const wrapper = (status: LearningPathProgressState) => css`
  color: inherit;
  background-color: ${status === "upcoming" ? "transparent" : "#F9F9F9"};
  border: 1px solid ${status === "completed" ? "#0AA949" : "#F0F0F0"};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 16px 20px;
  width: 230px;
  text-align: center;
  height: 100%;
  transition: all 0.3s ease;
    
  :hover {
    background-color: #f3f3f3;
  }
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
