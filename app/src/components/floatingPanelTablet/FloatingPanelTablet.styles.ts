import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
   width: max-content;
   border-radius: 12px;
    overflow: hidden;
    padding: 12px 24px;
    background-color: ${theme.colors["neutrals-01"][0]};
    box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.06);
    position: fixed;
   bottom: 20px;
   left: 50%;
   transform: translateX(-50%);
   z-index: 3;
   
`;
export const buttonsGroup = (theme: MantineTheme) => css`
display: flex;
button{
    color: ${theme.colors["neutrals-01"][9]};
       svg{
        vertical-align: text-bottom;
        margin-right: 8px;
       }
       padding-inline: 20px;
       &:first-of-type{
         padding-inline: 0 20px;
      }
      border-right: 1px solid ${theme.colors["neutrals-01"][3]};
      &:last-of-type{
          padding-inline: 20px 0px;
        border-right: none;
       }    
    }
`;
