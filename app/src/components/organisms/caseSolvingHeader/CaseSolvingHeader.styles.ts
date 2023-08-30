import { SerializedStyles, css } from "@emotion/react";
import type { MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme): SerializedStyles => css`
  /* temnporary height !!!! */
  /* height: 488px; */
  /* background: var(
    --gradients-fader-cases-radial,
    radial-gradient(
      50% 50% at 50% 50%,
      rgba(199, 211, 251, 0) 0%,
      ${theme.colors["cc-cases"][2]} 100%
    )
  ); */
  position: relative;
  #bg-overlay {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      z-index: 1;
    }
  }
`;

export const body = (theme: MantineTheme): SerializedStyles => css`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding:100px 60px;
  @media (max-width: 800px) {
    justify-content: center;  
    gap: 32px;
  }

`;

export const bodyText = (theme: MantineTheme): SerializedStyles => css`
width:45% ;
.icons-bar{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap:8px;
}
.bread-crumb{
  margin:32px 0px 8px 0 ;
  a{
    color: ${theme.colors["transparency-01"][5]};
    text-transform: uppercase;
  }
}
.title{
  color: ${theme.colors["transparency-02"][1]};
}
@media (max-width: 800px) {
  width:100% ;
  }
`;

export const bodyCard = (theme: MantineTheme): SerializedStyles => css`
width:45% ;
min-width: 350px;
@media (max-width: 800px) {
  width:100% ;
  }
`
