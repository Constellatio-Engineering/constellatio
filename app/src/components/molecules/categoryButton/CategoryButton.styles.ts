import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
  cursor: pointer;
  width: 100%;
  display: flex;
  padding: 16px 16px 16px 24px;
  justify-content: space-between;
  align-items: center;

  border-radius: 12px;
  border: 1px solid ${theme.colors["neutrals-01"][3]};
  background-color: ${theme.colors["neutrals-01"][0]};
  transition: border-color 0.3s ease-in-out;

  > p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover {
    border-color: ${theme.colors["neutrals-01"][5]};
  }
`;
