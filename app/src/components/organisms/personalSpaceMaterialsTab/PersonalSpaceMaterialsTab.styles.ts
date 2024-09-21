import { css } from "@emotion/react";

export const materialTabContainerContent = css`
  align-items: flex-start;
  display: flex;
  gap: 32px;
  justify-content: space-between;
  margin-top: 40px;
  flex-direction: column; 
  @media screen and (min-width: 1200px) {
    flex-direction: row;
  }
`;

export const contentWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  margin: 0;
`;
