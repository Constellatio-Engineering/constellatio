import { colors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = css`
  width: 100%;
`;

export const categoryTitleWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px 8px 32px;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  border-bottom: 1px solid ${colors["neutrals-01"][3]};
`;

export const activeFiltersCount = css`
  color: ${colors["neutrals-01"][7]};
`;

export const categoryActionsWrapper = css`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const divider = css`
  border-right: 1px solid ${colors["neutrals-01"][3]};
  height: 24px;
`;

export const resetButton = css`
  text-decoration: underline;
  font-weight: 500;
  color: ${colors["neutrals-01"][8]};
  font-size: 16px;
`;

export const expandButton = css`
  border: none;
  margin-left: -12px;
`;

export const itemsWrapper = css`
  background-color: ${colors["neutrals-01"][1]};
`;

export const itemWrapperCollapsed = css`
  display: none;
`;

export const itemWrapper = css`
  display: flex;
  align-items: center;
  padding: 8px 32px;
  border-bottom: 1px solid ${colors["neutrals-01"][3]};
`;

