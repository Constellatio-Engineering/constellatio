import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = () => css`
    flex: 1;
    min-width: 270px;
    max-width: 314px;
    height: 160px;
    background: ${colooors["neutrals-01"][0]};
    border: 1px solid ${colooors["neutrals-01"][3]};
    border-radius: 12px;
    padding: 20px; 
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    cursor: pointer;
    &:hover {
    background: ${colooors["neutrals-01"][1]};
  }
  &:active {
    background: ${colooors["neutrals-01"][2]};
  }
`;
export const tag = css``;
