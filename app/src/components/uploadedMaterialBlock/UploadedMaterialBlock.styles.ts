import { css } from "@emotion/react";
import { MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
  background-color: ${theme.colors["neutrals-01"][0]};
`;
export const uploadedMaterialBlockHead = (theme: MantineTheme) => css`
  color: ${theme.colors["neutrals-02"][0]};
  span {
    color: ${theme.colors["neutrals-01"][7]};
  }
  padding: 24px;
  border-bottom: 1px solid ${theme.colors["neutrals-01"][2]};
`;
