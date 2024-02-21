import { colors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = css`
  padding-top: 60px;
  max-width: 920px;
`;

export const head = css`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  align-items: center;
  margin-bottom: 24px;
`;

export const totalAmountAndSortingWrapper = (fullWidth: boolean) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${fullWidth ? "100%" : "auto"};
  color: ${colors["neutrals-01"][9]};
`;

export const totalAmount = css`
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 700;
`;

export const sortWrapper = css`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const sortWrapperHidden = css`
  visibility: hidden;
`;

export const selectSorting = css`
  background-color: transparent;
  border: none;
  outline: none;
  color: inherit;
  font: inherit;
`;
