import { colors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = css`
  display: flex;
  gap: 24px;
  background-color: white;
`;

export const upvoteColumn = css`
  width: 24px;
  min-width: 24px;
  padding-top: 6px;
`;

export const contentColumn = css`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

export const authorAndDateWrapper = css`
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 14px;
  margin: 40px 0;
`;

export const authorWrapper = css`
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const profilePicture = css`
  border-radius: 100%;
  border: 1px solid ${colors["neutrals-01"][4]};
  padding: 3px;
`;

export const author = css`
  font-weight: 600;
`;

export const date = css`
  color: ${colors["neutrals-01"][7]};
`;
