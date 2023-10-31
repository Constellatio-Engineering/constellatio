import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const modalContentWrapper = css`
  text-align: center;
`;
export const changeEmailModalTitle = css`
  margin-bottom: 24px;
`;
export const changeEmailModalCaption = (theme: MantineTheme) => css`
  margin-bottom: 8px;
  color: ${theme.colors["neutrals-01"][9]};
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
