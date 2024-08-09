import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const outerContainer = (theme: MantineTheme) => css`
  background: ${theme.colors["neutrals-01"][2]};
  padding: 54px 60px 0 60px;
  position: relative;
  z-index: 4;
  min-height: 600px;
  margin-top: -80px;
  @media screen and (max-width: 1100px) {
    margin-top: 0px;
    padding: 24px;
  }

`;
export const innerContainer = css`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  gap: 50px;
  justify-content: flex-start;
  position: relative;

    @media screen and (max-width: 1100px) {
        flex-direction: column;
    }
`;
