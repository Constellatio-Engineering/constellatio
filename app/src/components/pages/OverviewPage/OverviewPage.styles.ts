import { colooors } from "@/constants/styles/colors";

import { css, type SerializedStyles } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const ListWrapper = css`
  transform: translateY(-140px);
  display: grid;
  position: relative;
  z-index: 3;
`;

export const Page = (theme: MantineTheme): SerializedStyles => css`
    background-color: ${colooors["neutrals-01"][2]};
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

export const filtersCount = css`
  color: ${colooors["neutrals-01"][7]};
  margin-left: 4px;
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

export const noResultsWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  max-width: 500px;
  margin: 0 auto;
  * {
    text-align: center;
  }
`;
