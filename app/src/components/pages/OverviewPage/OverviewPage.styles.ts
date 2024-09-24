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
  gap: 30px;
`;

export const filtersButtonWrapper = css`
  min-width: max-content;
  button {
    min-width: max-content;
    border: none;
    :hover {
      border: none;
    }
  }
`;

export const activeFiltersChips = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  align-items: center;
  h1 {
    display: inline-block;
  }
`;

export const clearFiltersButtonWrapper = css`
  min-width: max-content;
  button {
    min-width: max-content;
  }
`;
