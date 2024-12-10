import { colooors } from "@/constants/styles/colors";
import { type CaseLearningTestProgressState } from "@/hooks/useLearningPathProgress";

import { css } from "@emotion/react";

export const wrapper = css`
  display: flex;
  gap: 30px;
`;

export const visualPathWrapper = css`
  min-width: max-content;
  position: relative;
`;

export const iconWrapperCompleted = css`
  transform: translateX(5px);
`;

export const connectingLine = (isColoured: boolean) => css`
  position: absolute;
  left: 50%;
  top: 60px;
  height: 100%;
  width: 5px;
  background-color: ${isColoured ? "#E58180" : "#E8E8E8"};
  transform: translateX(-50%);
  z-index: -1;
`;

export const unitWrapper = css`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

export const unit = css`
  width: 100%;
`;

export const unitDisabled = css`
  opacity: 0.4;
  pointer-events: none;
`;

export const unitTitleWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  margin-bottom: 6px;
`;

export const unitTitle = css`
  font-size: 20px;
  line-height: 1.4;
  flex: 1;
  min-width: 0;
`;

export const unitProgressStateBadgeWrapper = css`
  min-width: max-content;
`;

export const unitCompletedCount = css`
  font-weight: 500;
  color: #949494;
  font-size: 18px;
  letter-spacing: 3px;
`;

export const unitContentPieces = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 24px 0;
`;

export const testList = css`
  list-style: none;
`;

export const container = css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 12px;
  background-color: ${colooors["neutrals-01"][2]};
  gap: 16px;
`;
