import { type SerializedStyles, css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme): SerializedStyles => css`
  margin: 0 auto;
  background-color: ${colooors["neutrals-01"][2]};
`;

export const main = css`
  position: relative;
  margin-top:60px;
  min-height: calc(100vh - (60px + 72px));
`;

export const onboardingOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 35;
  background-color: rgba(0, 0, 0, 0.6);
`;
