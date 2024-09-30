import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = css`
  position: relative;
  border-radius: 50%;
  padding: 2px;
  transition: opacity .2s;
  svg {
    transform: translateY(2px);
  }
  :hover, :active {
    opacity: .6;
  }
`;

const countSize = 16;

export const count = css`
  position: absolute;
  top: -2px;
  right: -2px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${countSize}px;
  height: ${countSize}px;
  border-radius: 50%;
  background-color: ${colooors["support-error"][3]};
  color: white;
  font-size: 10px;
  font-weight: bold;
  z-index: 1;
`;
