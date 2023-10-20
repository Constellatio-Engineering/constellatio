import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = css`
  /* border: 1px solid yellow; */
  position:relative;
  height: 100px;
`;
export const track = (theme: MantineTheme) => css`
  background: repeating-linear-gradient(
    -45deg,
    ${theme.colors["transparency-02"][0]},
    ${theme.colors["transparency-02"][0]} 2px,
    ${theme.colors["transparency-01"][1]} 2px,
    ${theme.colors["transparency-01"][1]} 16px
    );
    width: 100%;
    border: 1px solid ${theme.colors["transparency-03"][1]};
  height: 50px;
  border-radius: 12px;
  position: relative;
  display: flex;
  align-items: center;
`;
export const progress = (theme: MantineTheme) => css`
  position: absolute;
  width: 17%;
  height: 100%;
  border-radius: 12px;
  border: 2px solid ${theme.colors["transparency-02"][3]};
  background: var(
    --gradients-chart-gradient-01,
    linear-gradient(
      90deg,
      ${theme.colors["brand-02"][4]} 51.84%,
      transparent 133.19%
    )
  );
`;
export const progresDescription = (theme: MantineTheme) => css`
  color: ${theme.colors["neutrals-01"][0]};
  position: relative;
  z-index: 3;
  margin-left: 12px;
  svg{
    display: inline-block;
    vertical-align: middle;
    margin-right: 8px;
    background-color: ${theme.colors["brand-02"][5]} ;
    padding: 8px;
    box-sizing: content-box;
    border-radius: 50%;
  }
`;
export const checkPoints = (theme: MantineTheme) => css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    span{
        width: 100px;
        /* background-color: ${theme.colors["transparency-02"][2]}; */
        color: ${theme.colors["transparency-02"][7]};
        height: 100%;
        position:absolute;
        vertical-align: bottom;
        transform: translateX(-100%);
        border-right: 2px solid ${theme.colors["transparency-02"][2]};
        p{
            position: absolute;
            bottom: 0;
            right: 12px;
            width: max-content;
        }
        &:nth-of-type(1){
            left:25%;
        }
        &:nth-of-type(2){
            left:50%;
        }
        &:nth-of-type(3){
            left:75%;
        }
        &:nth-of-type(4){
            left:100%;
            border:0;
        }
    }
`;
