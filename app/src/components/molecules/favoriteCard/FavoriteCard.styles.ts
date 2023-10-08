import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
  background: ${theme.colors["neutrals-01"][0]};
  padding: 20px;
  flex: 1;
  min-width: 270px;
  height: 160px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  align-items: flex-start;
  border: 1px solid ${theme.colors["neutrals-01"][4]};
  &:hover {
    background: ${theme.colors["neutrals-01"][1]};
  }
  &:active {
    background: ${theme.colors["neutrals-01"][2]};
  }
`;
export const tags = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  pointer-events: none;
`;
export const title = css``;
