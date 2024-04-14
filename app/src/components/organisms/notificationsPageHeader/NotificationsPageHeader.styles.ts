import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = css`
  position: relative;
`;

export const contentContainer = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
`;
