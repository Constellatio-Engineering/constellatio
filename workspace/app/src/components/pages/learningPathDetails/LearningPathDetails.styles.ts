import { headerHeightPx } from "@/components/organisms/Header/Header.styles";

import { css } from "@emotion/react";

export const responsiveBreakpoint = 1250;

export const contentWrapper = css`
  padding-top: 60px;
  max-width: 1800px;
  width: 96%;
`;

export const layoutWrapper = css`
  display: flex;
  gap: 50px;
  @media screen and (max-width: ${1500}px) {
    gap: 30px;
  }
  @media screen and (max-width: ${responsiveBreakpoint}px) {
    flex-direction: column-reverse;
  }
`;

export const card = css`
  background-color: #ffffff;
  border: 1px solid #f0f0f0;
  padding: 24px;
  border-radius: 12px;  
`;

export const unitsColumn = css`
  display: flex;
  flex-direction: column;
  gap: 30px;
  flex: 1;
  min-width: 0;
`;

export const headerColumn = css`
  align-self: flex-start;
  position: sticky;
  top: ${headerHeightPx + 30}px;
  width: clamp(440px, 25vw, 500px);
  min-width: 0;
  @media screen and (max-width: ${responsiveBreakpoint}px) {
    position: relative;
    width: 100%;
    top: 0;
    display: flex;
    flex-direction: column-reverse;
    align-items: stretch;
    gap: 10px;
  }
`;
