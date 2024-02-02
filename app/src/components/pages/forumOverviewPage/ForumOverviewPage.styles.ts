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
  gap: 0px;
`;

export const selectSorting = css`
  background-color: transparent;
  border: none;
  outline: none;
  color: inherit;
  font: inherit;
`;

export const questionsWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const endOfListReached = css`
  color: ${colors["neutrals-01"][6]};
  text-align: center;
  font-weight: 500;
  margin-top: 10px;
`;
