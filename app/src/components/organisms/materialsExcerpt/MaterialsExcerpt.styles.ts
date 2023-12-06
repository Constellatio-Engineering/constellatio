import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const emptyCard = (theme: MantineTheme) => css`
  background-color: ${theme.colors["neutrals-01"][0]};
  width: 100%;
  border-radius: 12px;
`;
