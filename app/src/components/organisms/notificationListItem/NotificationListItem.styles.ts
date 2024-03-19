import { colors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const notificationWrapper = css`
  border: solid 1px ${colors["neutrals-01"][3]};
  background-color: white;
  padding: 20px 24px;
  border-radius: 8px;
  color: inherit;
`;

export const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
`;

export const userIconAndTitle = css`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const title = css`
  font-size: 18px;
  font-weight: 600;
`;

export const date = css`
  color: ${colors["neutrals-01"][7]};
  font-size: 14px;
`;
