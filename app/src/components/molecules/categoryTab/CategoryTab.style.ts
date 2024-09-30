import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = () => css`
  outline: 0;
  border: 0;
  background-color: ${colooors["neutrals-01"][2]};
  color: ${colooors["neutrals-02"][1]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;

  .icon {
    margin-right: 16px;
    width: 40px;
    height: 40px;
    background-color: ${colooors["neutrals-02"][1]};
    color: white;
    display: grid;
    place-items: center;
    border-radius: 50%;
  }
  .counter {
    color: ${colooors["neutrals-01"][7]};
  }
  &:hover {
    background-color: ${colooors["neutrals-01"][2]};
    border-radius: 12px;
    color: ${colooors["neutrals-02"][1]};
    .icon {
      background-color: ${colooors["neutrals-02"][1]};
    }
  }
  &:active {
    background-color: ${colooors["neutrals-01"][3]};
  }
  &.selected {
    position: relative;
    background-color: ${colooors["neutrals-01"][0]};
    &::after {
      position: absolute;
      content: "";
      width: calc(100% + 6px);
      height: calc(100% + 6px);
      top: -3px;
      left: -3px;
      border-radius: 14px;
      outline: 2px solid white;
    }
  }
`;
