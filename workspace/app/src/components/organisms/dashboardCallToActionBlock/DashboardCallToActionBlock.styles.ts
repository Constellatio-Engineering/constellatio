import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = () => css`
  background-color: ${colooors["neutrals-01"][0]};
  padding: 48px 32px 48px 32px;
  border-radius: 12px;
`;

export const innerWrapper = css`
  max-width: 100%;
  width: 100%;
  overflow: hidden;
  display:flex;
  gap: 30px;
  @media screen and (max-width: 1200px) {
    flex-direction:column;
  }
`;

export const callToActionBlock = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 24px;
`;

