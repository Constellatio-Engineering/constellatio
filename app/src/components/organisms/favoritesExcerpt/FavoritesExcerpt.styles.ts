import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles"; 

export const wrapper = css`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

export const emptyCard = (theme: MantineTheme) => css`
  background-color: ${colooors["neutrals-01"][0]};
  width: 100%;
  border-radius: 12px;
`;
