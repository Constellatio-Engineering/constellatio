import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
  background-color: ${colooors["neutrals-01"][0]};
  padding: 60px 32px 48px 32px;
  border-radius: 12px;
  border-top: 12px solid ${theme?.colors?.blue?.[2]};
`;

export const innerWrapper = css`
  max-width: 100%;
  width: 100%;
  overflow: hidden;
  display:flex;
  gap: 30px;
  @media screen and (max-width: 1200px) {
    flex-direction:column;
  }
`;
