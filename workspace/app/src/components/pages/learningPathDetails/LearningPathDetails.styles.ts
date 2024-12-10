import { headerHeightPx } from "@/components/organisms/Header/Header.styles";

import { css } from "@emotion/react";

export const contentWrapper = css`
  padding-top: 60px;
`;

export const layoutWrapper = css`
  display: flex;
  gap: 50px;
`;

export const card = css`
  background-color: #ffffff;
  border: 1px solid #f0f0f0;
  padding: 24px;
  border-radius: 12px;
`;

export const unitsColumn = css`
  display: flex;
  flex-direction: column;
  gap: 30px;
  flex: 1;
  min-width: 0;
`;

export const headerColumn = css`
    width: 500px;
    align-self: flex-start;
    position: sticky;
    top: ${headerHeightPx + 30}px;
    h1 {
        font-size: 28px;
    }
`;
