import { css } from "@emotion/react";

export const wrapper = css`

`;

export const contentContainer = css``;

export const sections = css`
  width: 95%;
  max-width: 1440px;
  margin:0 auto;
  /* when we enable the progress in the header we need to make this padding [top] around 240px */
  /* padding:240px 60px 100px 60px; */
  padding:150px 0 100px 0px;
  display: flex;
  flex-direction: column;
  gap:100px;
@media screen and (max-width: 1200px) {
    padding:180px 60px 60px 60px;
    gap:60px;
}
`;
