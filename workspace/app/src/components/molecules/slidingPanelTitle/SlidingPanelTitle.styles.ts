import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = () => css`
  background-color: ${colooors["neutrals-01"][0]};
  padding: 20px 20px 20px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px solid ${colooors["neutrals-01"][2]};
  position: relative;
  .count {
    color: ${colooors["neutrals-01"][7]};
  }
  svg{
    cursor: pointer;
  }
  &::after {
    position: absolute;
    content: "";
    right: 72px;
    top: 0;
    width: 2px;
    height: 100%;
    background-color: ${colooors["neutrals-01"][2]};
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width: calc(100% - 72px);
  }
`;

export const titleWrapper = css`
  flex: 1;
  min-width: 0;
  margin-right: 22px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const subTitleWrapper = css`
  min-width: 0;
  align-self: stretch;
  max-width: 100%;
`;
