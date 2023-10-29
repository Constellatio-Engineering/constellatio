import { colors } from "@/constants/styles/colors";

import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const smallBadgeCardWidth = 200;
export const smallBadgeCardHeight = 180;

export const wrapper = css`
  position: relative;
  border-radius: 12px;
  background-color: ${colors["neutrals-01"][1]};
`;

export const wrapperDisabled = css`
  pointer-events: none;
  user-select: none;
  cursor: default;
`;

export const wrapperSmall = css`
  width: ${smallBadgeCardWidth}px;
  min-width: ${smallBadgeCardWidth}px;
  height: ${smallBadgeCardHeight}px;
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;
  :hover, :active, :focus {
    background-color: ${colors["neutrals-01"][2]};
  }
`;

export const wrapperLarge = (isHighlighted: boolean) => css`
  flex: 1;
  transition: outline-color 0.3s ease-in-out .3s;
  outline: 1px solid ${isHighlighted ? colors["neutrals-01"][9] : "transparent"};
  scroll-margin: 70px !important;
`;

export const comingSoonOverlay = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,0.025);
  border-radius: 12px;
  z-index: 1;
`;

export const badgeWrapper = css`
  border: 1px solid ${colors["neutrals-01"][3]};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  position: relative;
  border-radius: 12px;
  width: 100%;
`;

export const badgeWrapperSmall = css`
  height: 100%;
  justify-content: center;
`;

export const badgeWrapperLarge = css`
  padding: 24px 16px 16px 16px;
  justify-content: space-between;
`;

export const badgeWrapperSelected = css`
  border: 1px solid ${colors["neutrals-01"][7]};
`;

export const contentComingSoon = css`
  opacity: 0.18;
  filter: blur(4px);
`;

export const imageWrapper = css`
  width: 100%;
  height: 100px;
  position: relative;
`;

export const badgeImage = css`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const badgeTitle = (theme: MantineTheme) => css`
  color: ${theme.colors["neutrals-02"][1]};
  text-align: center;
  `;

export const badgeDescriptionArea = () => css`
  background-color: ${colors["neutrals-01"][0]};
  text-align: center;
  color: ${colors["neutrals-01"][7]};
  padding: 16px;
  border-radius: 0 0 12px 12px;
  border: solid 1px ${colors["neutrals-01"][3]};
`;

export const badgeDescriptionText = css``;
export const checkCircle = css`
    position: absolute;
    top: 12px;
    right: 12px;
`;
