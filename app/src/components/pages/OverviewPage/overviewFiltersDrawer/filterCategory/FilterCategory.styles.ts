import { colooors } from "@/constants/styles/colors";

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
  cursor: pointer;
  border-bottom: 1px solid ${colooors["neutrals-01"][3]};
`;

export const activeFiltersCount = css`
  color: ${colooors["neutrals-01"][7]};
`;

export const categoryActionsWrapper = css`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const divider = css`
  border-right: 1px solid ${colooors["neutrals-01"][3]};
  height: 24px;
`;

export const resetButton = css`
  padding: 8px;
  text-decoration: underline;
  font-weight: 500;
  color: ${colooors["neutrals-01"][8]};
  font-size: 16px;
`;

export const expandIconWrapper = css`
  margin-right: 8px;
`;

export const itemsWrapper = css`
  background-color: ${colooors["neutrals-01"][1]};
`;

export const itemWrapperCollapsed = css`
  display: none;
`;

export const searchInputWrapper = css`
  padding: 12px 32px;
`;

