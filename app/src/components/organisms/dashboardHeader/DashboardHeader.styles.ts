import { widthPercentage as badgesCarouselWidth } from "@/components/organisms/badgesCarouselBlock/BadgesCarouselBlock.styles";
import { widthPercentage as learningTimeCardWidth } from "@/components/organisms/learninTimeCard/LearninTimeCard.styles";

import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = css`
  position: relative;
`;

export const contentContainer = css`
  position: absolute;
  top: 100px;
  z-index: 2;
  padding: 0;
  h1 {
    position: relative;
    top: 10px
  }
  @media screen and (max-width: 1300px) {
    padding: 0 20px;
    min-width: auto;
  }
`;

export const headerTitle = (theme: MantineTheme) => css`
    color: ${theme.colors["neutrals-01"][0]};
    text-align: center;
`;

export const headerCardsArea = css`
  display: flex;
  align-items: stretch;
  margin-top: 50px;
  gap: ${100 - learningTimeCardWidth - badgesCarouselWidth}%;
  width: 100%;
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