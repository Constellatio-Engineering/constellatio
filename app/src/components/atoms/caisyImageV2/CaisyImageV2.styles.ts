import { css } from "@emotion/react";

export const image = (backgroundColor?: string | null) => css`
  background-color: ${backgroundColor ?? "#fafafa"};
  width: 100%;
  height: auto;
`;

export const withOnClick = css`
  cursor: pointer;
`;
