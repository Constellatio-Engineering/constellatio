import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = css`
  position: relative;
`;

export const contentContainer = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  @media screen and (max-width: 1300px) {
    min-width: auto;
  }
`;

export const headerTitle = () => css`
  color: ${colooors["neutrals-01"][0]};
  text-align: center;
`;
