import { cardsSmallerBreakpoint } from "@/components/organisms/streakCard/StreakCard.styles";

import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const width = 300;
export const widthSmall = 200;

export const wrapper = (theme: MantineTheme) => css`
  background-color: ${theme.colors["neutrals-01"][0]};
  width: ${width}px;
  padding: 18px;
  border-radius: 12px;
  @media screen and (max-width: ${cardsSmallerBreakpoint}px) {
    width: ${widthSmall}px;
  }
`;
