import { colooors } from "@/constants/styles/colors";

import { css, type SerializedStyles } from "@emotion/react";

const CSSDisabledStyles = (): SerializedStyles => css`
  color: ${colooors["neutrals-01"][7]};
  border: 0;
  cursor: default;
  &:hover::after {
    display:none;
  }
`;

// eslint-disable-next-line import/no-unused-modules
export const menuTabStyles = ({ active, disabled }: {
  active?: boolean;
  disabled?: boolean;
}) => css`
  padding: 20px 0;
  display: inline-block;
  text-transform: uppercase;
  color: ${colooors["neutrals-02"][1]};
  white-space: nowrap;
  cursor: pointer;
  transition: opacity 0.2s;
  p {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
  }
  position:relative;
  &::after {
    position: absolute;
    width: 100%;
    height: 3px;
    background-color: ${!active ? "transparent" : colooors["neutrals-02"][1]};
    content: "";
    bottom: 0px;
    left: 0;
    transition: background-color .2s;
  }
  :hover {
    opacity: .8;
  }
  &:hover::after {
    background-color: ${colooors["neutrals-01"][7]};
  }
  ${disabled && CSSDisabledStyles()};
`;

export const number = () => css`
color:${colooors["neutrals-01"][7]};
`;
