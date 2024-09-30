import { width as learningTimeCardWidth, widthSmall as learningTimeCardWidthSmall, } from "@/components/organisms/learninTimeCard/LearninTimeCard.styles";
import { cardsSmallerBreakpoint, width as streakCardWidth, widthSmall as streakCardWidthSmall, } from "@/components/organisms/streakCard/StreakCard.styles";
import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = () => css`
  background-color: ${colooors["neutrals-01"][0]};
  border-radius: 12px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;   
  min-height: 290px;
  width: calc(100% - ${learningTimeCardWidth + streakCardWidth}px - 3%);
  @media screen and (max-width: ${cardsSmallerBreakpoint}px) {
    width: calc(100% - ${learningTimeCardWidthSmall + streakCardWidthSmall}px - 3%);
  }
`;
