import { SerializedStyles, css } from "@emotion/react";
import type { MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme): SerializedStyles => css`
  /* temnporary height !!!! */
  height: 488px;
  /* background: var(
    --gradients-fader-cases-radial,
    radial-gradient(
      50% 50% at 50% 50%,
      rgba(199, 211, 251, 0) 0%,
      ${theme.colors["cc-cases"][2]} 100%
    )
  ); */
  position: relative;
  #bg-overlay{
    position: absolute;
    inset: 0;   
    width: 100%;
    height: 100%;
   img{ 
    width: 100%;
    height: 100%;
    z-index: 1;
  }}

 .text{
    position:relative;
    z-index: 2;
 }
`;
