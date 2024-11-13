import { css } from "@emotion/react";

export const itemsWrapper = css`
  
`;

export const dropdownItem = css`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 12px 12px;
  color: black;
  font-size: 15px;
  border-bottom: 1px solid #F0F0F0;
  :last-of-type {
    border-bottom: 0;
  }
  :hover, :active {
    background-color: #f1f3f5;
  }
  svg {
    transform: translateY(2px);
    opacity: .7;
  }
`;
