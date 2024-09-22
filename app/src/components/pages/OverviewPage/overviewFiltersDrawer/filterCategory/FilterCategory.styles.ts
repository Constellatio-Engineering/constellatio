import { colors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = css`

`;

export const categoryTitleWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px 8px 32px;
  height: 60px;
  border-bottom: 1px solid ${colors["neutrals-01"][3]};
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

export const expandButton = css`
  border: none;
`;
