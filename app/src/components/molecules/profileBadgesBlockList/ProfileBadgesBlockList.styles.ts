import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

const CSSShowAllAreaCommons = () => css`
  position:absolute;
  content: "";
  top:50%;
  background-color: ${colooors["neutrals-01"][3]};
  width: 41%;
  height: 1px;
`;

export const wrapper = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  /* gap: 10px; on max width no extra white space */
  flex-wrap: wrap;
`;

export const showAllArea = () => css`
  background-color: ${colooors["neutrals-01"][0]};
  width: 100%;
  transform: translateY(-0px);
  position: relative;
    &::after{
        ${CSSShowAllAreaCommons()}
        left: 16px;
    }
    &::before{
        ${CSSShowAllAreaCommons()}
        right: 16px;
    }
`;
export const showAllButton = () => css`
    margin: 0 auto;
    display: block;
    border: 1px solid ${colooors["neutrals-01"][3]};
    `;
export const showAllGredient = () => css`
        position: absolute;
        top: -130px;
        left: 0;
        background: linear-gradient(to top, ${colooors["neutrals-01"][0]} 30%, transparent 100%);
        width:100%;
        height: 130px;
`;
