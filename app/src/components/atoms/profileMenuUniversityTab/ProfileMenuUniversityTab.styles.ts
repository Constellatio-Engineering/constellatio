import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = css`
    padding: 12px 16px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    @media screen and (max-width: 1100px) {
      flex-direction: column;
      justify-content: center;
    }
`;

const iconSize = 50;

export const universityIconWrapper = css`
  width: ${iconSize}px;
  height: ${iconSize}px;
  min-width: ${iconSize}px;
  min-height: ${iconSize}px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
  img {
    opacity: .9;
    width: 60%;
    height: auto;
    transform: translateY(-1px);
  }
`;

export const text = css`
    overflow: hidden;
    width: 100%;
    p{
        overflow: hidden;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
}
`;
export const semesterText = () => css`
    color: ${colooors["neutrals-01"][7]};
`;
