import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = () => css`
  background-color: ${colooors["neutrals-01"][0]};
  display:none;
  position: relative;
  z-index: 3;
  @media screen and (max-width: 1100px) {
    display: block;
  }
`;

export const contentWrapper = css`
  justify-content: center;
  align-items: center;
  gap: 16px;
  display:flex;
`;
