import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const outerContianer = (theme: MantineTheme) => css`
  background: ${theme.colors["neutrals-01"][2]};
  padding: 54px 60px 0 60px;
  position: relative;
  margin-top: -150px;
  z-index: 4;
  min-height: 600px;
  @media screen and (max-width: 1024px) {
    padding: 24px;
  }
  @media screen and (max-width: 800px) {
    padding: 12px;
  }

`;
export const innerContainer = css`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  gap: 32px;
  justify-content: flex-start;
  position: relative;

    @media screen and (max-width: 1024px) {
        flex-direction: column;
        margin-top: -300px;
    }
`;
