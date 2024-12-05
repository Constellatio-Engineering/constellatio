import { css } from "@emotion/react";

export const wrapper = css`
  display: flex;
  gap: 30px;
`;

export const visualPathWrapper = css`
  min-width: max-content;
  position: relative;
`;

export const connectingLine = css`
  position: absolute;
  left: 50%;
  top: 60px;
  height: 100%;
  width: 3px;
  background-color: #E58180;
  transform: translateX(-50%);
  z-index: -1;
`;

export const unit = css`
  flex: 1;
  min-width: 0;
`;

export const unitTitle = css`
  font-size: 20px;
  line-height: 1.4;
  margin-bottom: 8px;
`;

export const unitCompletedCount = css`
  font-weight: 500;
  color: #949494;
  font-size: 18px;
`;

export const unitContentPieces = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 24px 0;
`;
