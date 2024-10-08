import { smallBadgeCardHeight, smallBadgeCardWidth } from "@/components/molecules/profileBadgeCard/ProfileBadgeCard.styles";
import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const skeletonCard = css`
  width: ${smallBadgeCardWidth}px;
  min-width: ${smallBadgeCardWidth}px;
  height: ${smallBadgeCardHeight}px;
  border-radius: 12px;
  background-color: ${colooors["neutrals-01"][1]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
 
