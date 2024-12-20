import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const authorWrapper = css`
  display: flex;
  flex-direction: row;
  gap: 6px;
  align-items: center;
`;

export const authorityWrapper = css`
  display: flex;
  gap: 1px;
`;

export const constellatioAuthority = css`
  font-weight: 600;
  font-size: 15px;
  display: flex;
  gap: 6px;
  align-items: center;  
  span {
    font-weight: inherit;
  }
  color: ${colooors["cc-forum"][5]};
`;

export const legalAuthority = css`
  font-weight: 600;
  font-size: 15px;
  display: flex;
  gap: 6px;
  align-items: center;  
  span {
    font-weight: inherit;
  }
  color: ${colooors["cc-cases"][4]};
`;

export const authorWrapperUser = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const profilePicture = (hasProfilePicture: boolean) => css`
  border-radius: 100%;
  border: 1px solid ${colooors["neutrals-01"][4]};
  padding: ${hasProfilePicture ? 0 : 3}px;
  object-fit: cover;
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
    color: ${colooors["neutrals-01"][7]};
  }
`;
