import { colors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const selectedTagsWrapper = css`
  background-color: white;
`;

export const headWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 32px;
  font-weight: 500;
`;

export const appliedTags = css`
`;

export const amountOfApplieableTags = css`
  color: ${colors["neutrals-01"][7]};
`;

export const badgesWrapper = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 32px 20px;
  border-bottom: 1px solid #F0F0F0;
`;

export const selectionAreaWrapper = css`
  padding: 20px 32px;
`;

export const selectableBadgesWrapper = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
`;
