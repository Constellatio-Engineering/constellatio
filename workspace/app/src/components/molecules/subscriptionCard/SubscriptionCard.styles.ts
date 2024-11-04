import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = () => css`
    background: ${colooors["neutrals-01"][0]};
    padding: 24px;
 margin: 32px 0;
 border-radius: 12px;
 border: 1px solid ${colooors["neutrals-01"][3]};

`;
export const discountBadge = () => css`
    padding: 4px 8px;
    background: ${colooors["brand-02"][4]};
    color: ${colooors["neutrals-02"][1]};
    margin-bottom:32px ;
    display: inline-block;
    border-radius: 12px;
`;
export const price = () => css`
    color: ${colooors["neutrals-02"][1]};
`;
export const totalPrice = css`
/* Couldn't find it's typography */
font-size: 44px;
font-style: normal;
font-weight: 500;
line-height: 68px; /* 154.545% */
margin-right: 16px;
`;
export const undiscountedPrice = () => css`
    color: ${colooors["neutrals-01"][7]};
    text-decoration: line-through;
    margin-right: 8px;

`;
