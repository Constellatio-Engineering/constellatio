import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = css`
  height: 100%;
  position: relative;
`;
export const contentContainer = css`
  min-height: 50vh;
  position: absolute;
  top: 46px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  padding: 0 60px;
  min-width: 1440px;
`;
export const headerTitle = (theme: MantineTheme) => css`
    color: ${theme.colors["neutrals-01"][0]};
    text-align: center;
    margin-bottom: 52px;
`;
export const headerCardsArea = css`
  display:flex;
  align-items: stretch;
  margin-top: 48px;
  gap:24px;
`;
