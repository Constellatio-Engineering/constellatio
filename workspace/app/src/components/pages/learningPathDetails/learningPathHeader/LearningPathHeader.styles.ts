import { headerHeightPx } from "@/components/organisms/Header/Header.styles";

import { css } from "@emotion/react";

export const wrapper = css`
  width: 500px;
  align-self: flex-start;
  position: sticky;
  top: ${headerHeightPx + 30}px;
  h1 {
    font-size: 28px;
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
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
`;

export const metricValue = css`
  font-size: 14px;
  font-weight: 500;
`;

export const UnitIconAndTotalTaskWrapper = css`
  position: relative;
  min-width: 0;
  width: fit-content;
`

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
