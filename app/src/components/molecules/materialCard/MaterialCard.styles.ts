import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
    flex: 1;
    min-width: 270px;
    max-width: 314px;
    height: 160px;
    background: ${theme.colors["neutrals-01"][0]};
    border: 1px solid ${theme.colors["neutrals-01"][3]};
    border-radius: 12px;
    padding: 20px; 
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    cursor: pointer;
    &:hover {
    background: ${theme.colors["neutrals-01"][1]};
  }
  &:active {
    background: ${theme.colors["neutrals-01"][2]};
  }
`;
export const tag = css``;
