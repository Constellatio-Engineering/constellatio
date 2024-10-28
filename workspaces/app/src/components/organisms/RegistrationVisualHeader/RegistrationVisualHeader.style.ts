import { responsiveBreakpoint } from "@/components/pages/AuthPage/AuthPage.styles";

import { css } from "@emotion/react";

export const wrapper = css`
  @media screen and (max-width: ${responsiveBreakpoint}px) {
    display: none;
  }
`;
