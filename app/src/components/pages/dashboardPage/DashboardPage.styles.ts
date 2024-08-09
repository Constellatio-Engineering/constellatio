import { css } from "@emotion/react";

export const sections = css`
  margin: 150px 0 100px;
  display: flex;
  flex-direction: column;
  gap:100px;
  @media screen and (max-width: 1200px) {
    margin: 180px 0 60px;
    gap: 60px;
  }
`;
