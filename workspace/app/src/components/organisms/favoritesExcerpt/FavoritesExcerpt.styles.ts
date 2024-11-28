import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = css`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

export const emptyCard = () => css`
  background-color: ${colooors["neutrals-01"][0]};
  width: 100%;
  border-radius: 12px;
`;
