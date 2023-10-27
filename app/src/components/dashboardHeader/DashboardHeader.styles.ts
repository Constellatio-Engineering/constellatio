import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = css`
  position: relative;
  `;
export const contentContainer = css`
  position: absolute;
  /* when we enable the progress component in the header we will have to adjust this top to be  top: 46px; */
  /* top: 46px; */
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  padding: 0 60px;
width: 100%;
max-width: 1440px;
  @media screen and (max-width: 1300px) {
    padding: 0 20px;
    min-width: auto;
  }
`;
export const headerTitle = (theme: MantineTheme) => css`
    color: ${theme.colors["neutrals-01"][0]};
    text-align: center;
    /* margin-bottom: 52px; */
`;
export const headerCardsArea = css`
  display:flex;
  align-items: stretch;
  margin-top: 48px;
  gap:24px;
`;
