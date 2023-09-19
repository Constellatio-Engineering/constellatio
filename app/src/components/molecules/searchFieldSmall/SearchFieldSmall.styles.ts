import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

import { icon } from "./../filtersButton/FiltersButton.style";

export const wrapper = (theme: MantineTheme) => css`
  position: relative;
  display: grid;
  max-width: max-content;
  place-items: center;
  padding: 4px 8px 4px 32px;
  border: 1px solid ${theme.colors["neutrals-01"][5]};
  border-radius: 16px;
  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    height: 16px;
    width: 16px;
    transform: translateY(-50%);
  }
  .cross-icon {
    position: absolute;
    right: 8px;
    top:45%;
    height: 16px;
    width: 16px;
    transform: translateY(-50%);
  }
  svg {
    position: absolute;
    cursor: pointer;
    color:${theme.colors["neutrals-01"][7]}; 
  }

  input {
    border: 0;
    outline: 0;
  }
`;
