import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = () => css`
    background: ${colooors["neutrals-01"][0]};
    border: 1px solid #F0F0F0;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
`;

export const flag = css`
  width: 50px;
  height: 50px;
`;

export const innerWrapper = css`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

export const textWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const title = css`
  font-size: 18px;
  font-weight: 600;
`;

export const subText = css`
  font-size: 14px;
  font-weight: 400;
  width: 400px;
  color: ${colooors["neutrals-02"][0]};
`;
