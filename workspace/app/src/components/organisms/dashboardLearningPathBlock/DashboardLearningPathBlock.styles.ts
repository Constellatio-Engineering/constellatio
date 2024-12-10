import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = () => css`
  background-color: ${colooors["neutrals-01"][0]};
  padding: 48px 32px 36px 36px;
  border-radius: 12px;
  border-top: 12px solid #F0B3B2;
  border-color: #eed4d4;
  position: relative;
  margin: -20px 0;
`;

export const innerWrapper = css`
  max-width: 100%;
  width: 100%;
  display: flex;
  gap: 50px;
  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

export const carouselWrapper = css`
  display: flex; 
  flex-direction: column;
  min-width: 0;
  flex: 1;
`;
