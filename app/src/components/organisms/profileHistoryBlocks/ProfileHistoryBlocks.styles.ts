import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = css`
  width: 100%;
`;
export const blockDate = () => css`
  color: ${colooors["neutrals-02"][1]};
  margin-bottom: 16px;
`;
export const list = css``;
export const table = () => css`
  border-radius: 12px;
  overflow: hidden;
  outline: 1px solid ${colooors["neutrals-01"][3]};
`;
export const tableRow = () => css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: ${colooors["neutrals-01"][0]};
  padding: 20px 16px;
  gap: 30px;
  border-bottom: ${colooors["neutrals-01"][3]} 1px solid;
`;
export const timeCell = () => css`
    color: ${colooors["neutrals-01"][7]};
`;
export const blockTitle = css`
  flex: 1;
`;
export const blockCategory = () => css`
    color: ${colooors["neutrals-02"][0]};
    text-align: left;
    min-width: 90px;
`;
export const blockType = css`
  min-width: 120px;
`;
export const listItem = css`
  margin: 32px 0;
`;
