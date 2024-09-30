import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = css`
  background: ${colooors["neutrals-01"][0]};
  flex: 1;
  min-width: 270px;
  max-width: 314px;
  height: 160px;
  border-radius: 12px;
  border: 1px solid ${colooors["neutrals-01"][4]};
`;

export const wrapperLoading = css`
  
`;

export const wrapperLoaded = css`
  cursor: pointer;
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  &:hover {
    background: ${colooors["neutrals-01"][1]};
  }
  &:active {
    background: ${colooors["neutrals-01"][2]};
  }
`;

export const tags = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  /* pointer-events: none; */
`;
export const title = css``;
