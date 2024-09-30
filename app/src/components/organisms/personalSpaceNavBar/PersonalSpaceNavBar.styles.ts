import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = () => css`
    background-color: ${colooors["neutrals-01"][0]};
`;

export const contentWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

