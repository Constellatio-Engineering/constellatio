import { colors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const selectedTagsWrapper = css`
  background-color: white;
  min-height: 135px;
`;

export const headWrapper = css`
  padding: 20px 32px;
`;

export const amountOfTagsWrapper = css`
  display: flex;
  justify-content: space-between;
`;

export const noTagsApplied = css`
  color: ${colors["neutrals-01"][7]};
  font-style: italic;
  margin-top: 12px;
`;

export const heading = css`
  font-size: 18px;
  font-weight: 500;
`;

export const amountOfApplieableTags = css`
  color: ${colors["neutrals-01"][7]};
  font-size: 15px;
  font-weight: 500;
`;

export const badgesWrapper = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 32px 40px;
  border-bottom: 1px solid #F0F0F0;
`;

export const selectionAreaWrapper = css`
  padding: 20px 32px;
`;

export const examples = css`
  color: ${colors["neutrals-01"][7]};
`;

export const noResults = css`
  color: ${colors["neutrals-01"][7]};
`;

export const selectableBadgesWrapper = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;
