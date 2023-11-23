import { css } from "@emotion/react";

export const contentWrapper = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  padding: 0 12px 20px;
`;

export const buttonsWrapper = css`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  button {
    min-width: unset;
    width: 42%;
  }
`;
