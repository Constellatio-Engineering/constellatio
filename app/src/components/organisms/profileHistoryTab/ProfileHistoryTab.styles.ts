import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const titleWrapper = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  margin-bottom: 32px;
  @media screen and (max-width: 1100px) {
    display:none;
  }
`;

export const refreshButton = css`
  min-width: max-content;
  margin-left: 30px;
`;

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
  color: #000000;
  border-bottom: ${colooors["neutrals-01"][3]} 1px solid;
  min-height: 70px;
  transition: background-color 0.15s ease;
  :hover, :after {
    background-color: ${colooors["neutrals-01"][1]};
  }
`;

export const timeCell = () => css`
  color: ${colooors["neutrals-01"][7]};
  min-width: 40px;
`;

export const blockTitle = css`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
`;

export const blockCategoryWrapper = () => css`
  color: ${colooors["neutrals-02"][0]};
  text-align: right;
  max-width: 300px;
  padding-left: 40px;
`;

export const blockCategory = () => css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const blockType = css`
  margin: 0 30px 0 20px;
  > div {
    min-width: 70px;
    width: 70px;
    text-align: center;
  }
`;

export const listItem = css`
    margin-bottom: 48px;
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
