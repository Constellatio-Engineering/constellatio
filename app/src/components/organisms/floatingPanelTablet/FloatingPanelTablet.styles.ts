import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
   width: max-content;
   border-radius: 12px;
    overflow: hidden;
    /* padding: 12px 24px; */
    background-color: ${colooors["neutrals-01"][0]};
    box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.06);
    position: fixed;
   bottom: 20px;
   left: 50%;
   transform: translateX(-50%);
   z-index: 99;
   display:none;
   @media screen and (max-width: 1100px) {
      display:block;
   }
   
`;
export const buttonsGroup = (theme: MantineTheme) => css`
display: flex;
button{
    color: ${colooors["neutrals-01"][9]};
       svg{
        vertical-align: text-bottom;
        margin-right: 8px;
       }
       padding:12px 24px;
       position: relative;
       &::after {
         content: "";
         position: absolute;
         width: 1px;
         height: 50%;
         background-color: ${colooors["neutrals-01"][3]};
         right: 0;
         top: 0;
         bottom: 0;
         margin: auto;
       }
       &:last-of-type {
         &::after {
           display: none;
         }
       }
    }
`;
