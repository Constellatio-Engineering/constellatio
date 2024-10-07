import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const topicCell = css`
  min-width: 100px;
  max-width: 200px;
  p {
    text-align: left;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const bookmarkButtonCell = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 0 16px;
  gap: 8px;
  border-bottom: 1px solid ${colooors["neutrals-01"][3]};
  background-color: ${colooors["neutrals-01"][0]};
  transition: border-color 0.3s ease-in, background-color 0.3s ease-in;
`;
