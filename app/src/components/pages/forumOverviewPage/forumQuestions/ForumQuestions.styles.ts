import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const questionsWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const endOfListReached = css`
  color: ${colooors["neutrals-01"][6]};
  text-align: center;
  font-weight: 500;
  margin-top: 10px;
  visibility: hidden;
`;

export const endOfListReachedVisible = css`
  visibility: visible;
`;
