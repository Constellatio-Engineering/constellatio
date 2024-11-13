import { cardsSmallerBreakpoint } from "@/components/organisms/streakCard/StreakCard.styles";
import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const width = 300;
export const widthSmall = 200;

export const wrapper = () => css`
  background-color: ${colooors["neutrals-01"][0]};
  width: ${width}px;
  padding: 18px;
  border-radius: 12px;
  @media screen and (max-width: ${cardsSmallerBreakpoint}px) {
    width: ${widthSmall}px;
  }
`;
