import { headerHeightPx } from "@/components/organisms/Header/Header.styles";

import { css } from "@emotion/react";

export const wrapper = css`
  width: 500px;
  align-self: flex-start;
  position: sticky;
  top: ${headerHeightPx + 30}px;
  h1 {
    font-size: 28px;
  }
`;
