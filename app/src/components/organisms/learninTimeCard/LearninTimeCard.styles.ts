import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

// export const widthPercentage = 25;
export const widthPercentage = 68;

export const wrapper = (theme: MantineTheme) => css`
  background-color: ${theme.colors["neutrals-01"][0]};
  width: ${widthPercentage}%;
  width: 100%;
  padding: 24px;
  border-radius: 12px;
  height: 500px;
`;
