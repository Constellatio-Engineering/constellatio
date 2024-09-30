import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
    background-color: ${colooors["neutrals-01"][0]};
`;

export const contentWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

