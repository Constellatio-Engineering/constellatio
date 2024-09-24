import { css, type SerializedStyles } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const ListWrapper = css`
  transform: translateY(-140px);
  display: grid;
  position: relative;
  z-index: 3;
`;

export const Page = (theme: MantineTheme): SerializedStyles => css`
    background-color: ${theme.colors["neutrals-01"][2]};
  min-height: 100vh;
    position: relative;
`;

export const headerContent = css`
  padding-bottom: 40px;
`;

export const filtersWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 36px;
`;

export const filtersButtonWrapper = css`
  button {
    border: none;
    :hover {
      border: none;
    }
  }
`;

