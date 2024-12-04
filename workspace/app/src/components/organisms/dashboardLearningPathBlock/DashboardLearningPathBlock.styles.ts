import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = () => css`
  background-color: ${colooors["neutrals-01"][0]};
  padding: 60px 32px 48px 32px;
  border-radius: 12px;
  border-top: 12px solid ${colooors["brand-02"][3]};
`;

export const innerWrapper = css`
  max-width: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  gap: 30px;
  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

export const carouselWrapper = css`
display: 'flex'; 
flexDirection: 'column';
`;
