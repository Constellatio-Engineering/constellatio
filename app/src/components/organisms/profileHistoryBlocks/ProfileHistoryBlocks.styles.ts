import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = css`
  width: 100%;
`;

export const blockDate = () => css`
  color: ${colooors["neutrals-02"][1]};
  margin-bottom: 16px;
`;

export const table = () => css`
  border-radius: 12px;
  overflow: hidden;
  outline: 1px solid ${colooors["neutrals-01"][3]};
`;

export const tableRow = () => css`
  display: flex;
  align-items: center;
  background: ${colooors["neutrals-01"][0]};
  padding: 20px 16px;
  border-bottom: ${colooors["neutrals-01"][3]} 1px solid;
  gap: 20px;
  min-height: 70px;
`;

export const timeCell = () => css`
    color: ${colooors["neutrals-01"][7]};
`;

export const blockTitle = css`
  flex: 1;
`;

export const blockCategoryWrapper = () => css`
  color: ${colooors["neutrals-02"][0]};
  text-align: right;
  max-width: 200px;
  padding-left: 20px;
`;

export const blockCategory = () => css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const blockType = css`
  min-width: max-content;
`;

export const listItem = css`
  margin: 32px 0;
`;

export const endOfListReached = css`
  color: ${colooors["neutrals-01"][6]};
  text-align: center;
  font-weight: 500;
  margin-top: 30px;
  margin-bottom: 100px;
  visibility: hidden;
`;

export const endOfListReachedVisible = css`
  visibility: visible;
`;
