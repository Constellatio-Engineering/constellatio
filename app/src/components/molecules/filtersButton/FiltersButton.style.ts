import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const button = (theme: MantineTheme) => css`
  padding: 8px 16px;
  background-color: ${theme.colors["neutrals-01"][0]};
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  outline: 0;
  border: 0;
  border: 1px solid ${theme.colors["neutrals-01"][3]};
  svg {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    background-color: ${theme.colors["neutrals-01"][1]};
    border: 1px solid ${theme.colors["neutrals-01"][5]};
  }
  &:active {
    background-color: ${theme.colors["neutrals-01"][3]};
    border: 1px solid ${theme.colors["neutrals-01"][5]};
  }
  &:disabled {
    cursor: default;
    opacity: 1;
    pointer-events: none;
  }
`;

export const icon = ({ disabled, theme }: {
  disabled: boolean | undefined;
  theme: MantineTheme;
}) => css`
  color: ${disabled
    ? theme.colors["neutrals-01"][7]
    : theme.colors["neutrals-02"][1]};
`;
