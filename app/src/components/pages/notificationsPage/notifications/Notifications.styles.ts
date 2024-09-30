import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const notificationsWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const endOfListReached = css`
  color: ${colooors["neutrals-01"][6]};
  text-align: center;
  font-weight: 500;
  margin-top: 30px;
  visibility: hidden;
`;

export const endOfListReachedVisible = css`
  visibility: visible;
`;

