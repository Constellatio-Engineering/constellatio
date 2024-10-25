import { css } from "@emotion/react";

export const responsiveBreakpoint = 960;

export const wrapper = css`
  padding: 150px 0;
  min-height: 100svh;
  line-height: 1.3;
`;

export const contentWrapper = css`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  mark {
    background-color: #ff8ec2;
    border-radius: 4px;
    font-weight: 700;
    padding: 3px 5px;
  }
`;

export const form = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  button {
    align-self: flex-start;
  }
`;
