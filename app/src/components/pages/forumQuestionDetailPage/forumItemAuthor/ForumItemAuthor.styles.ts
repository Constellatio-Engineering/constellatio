import { colors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const authorWrapper = css`
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const profilePicture = css`
  border-radius: 100%;
  border: 1px solid ${colors["neutrals-01"][4]};
  padding: 3px;
`;

export const author = css`
  font-weight: 600;
  font-size: 15px;
  display: flex;
  gap: 6px;
  align-items: center;  
  span {
    font-weight: inherit;
  }
  span:nth-of-type(2) {
    color: ${colors["neutrals-01"][7]};
  }
`;
