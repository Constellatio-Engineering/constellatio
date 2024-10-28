import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = css`
  position:relative;
  height: 100px;
`;
export const track = () => css`
  background: repeating-linear-gradient(
    -45deg,
    ${colooors["transparency-02"][0]},
    ${colooors["transparency-02"][0]} 2px,
    ${colooors["transparency-01"][1]} 2px,
    ${colooors["transparency-01"][1]} 16px
    );
    width: 100%;
    border: 1px solid ${colooors["transparency-03"][1]};
  height: 50px;
  border-radius: 12px;
  position: relative;
  display: flex;
  align-items: center;
`;
export const progress = ({ progress }: {progress: number}) => css`
  position: absolute;
  width: ${progress}%;
  height: 100%;
  border-radius: 12px;
  border: 2px solid ${colooors["transparency-02"][3]};
  background: var(
    linear-gradient(
      90deg,
      ${colooors["brand-02"][4]} 51.84%,
      transparent 133.19%
    )
  );
`;
export const progresDescription = () => css`
  color: ${colooors["neutrals-01"][0]};
  position: relative;
  z-index: 3;
  margin-left: 12px;
  svg{
    display: inline-block;
    vertical-align: middle;
    margin-right: 8px;
    background-color: ${colooors["brand-02"][5]} ;
    padding: 8px;
    box-sizing: content-box;
    border-radius: 50%;
  }
`;
export const checkPoints = () => css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    span{
        width: 100px;
        /* background-color: ${colooors["transparency-02"][2]}; */
        color: ${colooors["transparency-02"][7]};
        height: 100%;
        position:absolute;
        vertical-align: bottom;
        transform: translateX(-100%);
        border-right: 2px solid ${colooors["transparency-02"][2]};
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
