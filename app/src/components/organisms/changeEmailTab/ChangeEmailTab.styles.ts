import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const modalContentWrapper = css`
  text-align: center;
  p {
    margin-bottom: 8px;
  }
`;
export const changeEmailModalTitle = css`
  margin-bottom: 24px;
`;
export const changeEmailModalCaption = () => css`
  margin-bottom: 8px;
  color: ${colooors["neutrals-01"][9]};
`;
export const changeEmailButton = css`
margin-top:24px;
`;
export const changeEmailTabTitle = css`
  display: block;
  @media screen and (max-width: 1100px){
    display: none;
  }
`;
