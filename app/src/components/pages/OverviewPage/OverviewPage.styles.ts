import { type SerializedStyles, css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const ListWrapper = css`
  transform: translateY(-100px);
  display: grid;
  position: relative;
  z-index: 3;
`;

export const Page = (theme: MantineTheme): SerializedStyles => css`
    background-color: ${theme.colors["neutrals-01"][2]};
  min-height: 100vh;
    position: relative;
`;

