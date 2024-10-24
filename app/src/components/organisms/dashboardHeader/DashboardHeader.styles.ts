import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = css`
  position: relative;
`;

export const contentContainer = css`
  position: absolute;
  top: 100px;
  z-index: 4;
  padding: 0;
  @media screen and (max-width: 1300px) {
    min-width: auto;
    width: 94%;
  }
`;

export const headerTitleWrapper = css`
  position: relative;
  height: 70px;
`;

export const headerTitle = () => css`
  color: ${colooors["neutrals-01"][0]};
  text-align: center;
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  @media screen and (max-width: ${900}px) {
    font-size: 36px;
  }
`;

export const headerCardsArea = css`
  display: flex;
  align-items: stretch;
  margin-top: 100px;
  width: 100%;
  justify-content: space-between;
  > div {
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.05);
  }
`;

export const streakCardContainer = css`
  padding-top: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
