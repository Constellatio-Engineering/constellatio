import { colors } from "@/constants/styles/colors";

import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
  background-color: ${theme.colors["neutrals-01"][0]};
  padding: 20px 20px 20px 32px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${theme.colors["neutrals-01"][2]};
  position: relative;
  max-width: 100%;
  width: 100%;
`;

export const title = css`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const closeButtonWrapper = css`
  width: 72px;
  min-width: 72px;
  &::before {
    position: absolute;
    content: "";
    left: 0;
    top: 0;
    width: 2px;
    height: 100%;
    background-color: ${colors["neutrals-01"][2]};
  }
`;
