import { css } from "@emotion/react";

export const wrapper = css`
padding:32px;
border-radius: 8px;
background-color: #fff;
display: flex;
justify-content: flex-start;
align-items: flex-start;    
gap: 32px;
margin:24px 0;
position:relative;
z-index: 3;
/* color doesn't exist in Mantine Theme Colors array */
box-shadow: 0px 8px 44px 0px #0000000a;
`;
