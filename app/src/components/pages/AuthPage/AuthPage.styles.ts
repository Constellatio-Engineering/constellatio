import { css } from "@emotion/react";

export const responsiveBreakpoint = 960;

export const wrapper = css`
  border-radius: 30px 0 0 30px;
  @media screen and (max-width: ${responsiveBreakpoint}px) {
    border-radius: 0;
  }
`;
