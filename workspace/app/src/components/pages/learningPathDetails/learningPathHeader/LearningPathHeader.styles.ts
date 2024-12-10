import { responsiveBreakpoint } from "@/components/pages/learningPathDetails/LearningPathDetails.styles";

import { css } from "@emotion/react";

export const wrapper = css`
  width: 100%;
  h1 {
    font-size: 28px;
  }
  @media screen and (max-width: ${1400}px) {
    h1 {
      font-size: 26px;
    }
  }
  @media screen and (max-width: ${responsiveBreakpoint}px) {
    width: 100%;
    max-width: unset;
    background-color: transparent;
    padding: 12px;
    margin-bottom: 20px;
  }
`;

export const metricsWrapper = css`
  display: flex;
  gap: 24px;
`;

export const metricItem = css`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const metricIcon = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  box-shadow: 0 0 0 1px #f0f0f0, 0 0 0 1px #ddd;
`;

export const metricText = css`
  display: flex;
  flex-direction: column;
`;

export const metricLabel = css`
  font-size: 14px;
  color: #666;
  text-transform: uppercase;
  margin-bottom: 2px;
`;

export const metricValue = css`
  font-size: 16px;
  font-weight: 500;
`;

export const UnitIconAndTotalTaskWrapper = css`
  position: relative;
  min-width: 0;
  width: fit-content;
`;

export const totalTasksNotificationWrapper = css`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: #666;
  border: 6px solid white;
  border-radius: 50%;
`;

export const totalTasksNotification = css`
  color: black;
`;
