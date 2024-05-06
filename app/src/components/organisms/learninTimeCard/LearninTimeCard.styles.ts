import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const widthPercentage = 26;

export const wrapper = (theme: MantineTheme) => css`
  background-color: ${theme.colors["neutrals-01"][0]};
  width: ${widthPercentage}%;
  padding: 24px;
  border-radius: 12px;
`;
