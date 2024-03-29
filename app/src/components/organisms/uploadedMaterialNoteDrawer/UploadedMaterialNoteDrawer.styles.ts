import { type UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import { type DrawerStylesNames } from "@mantine/core";
import { type MantineTheme, type Styles } from "@mantine/styles";

type DrawerStylesProps = Styles<DrawerStylesNames, UnknownMantineStylesParams>;

export const drawerStyles = () => 
{
  const styles: DrawerStylesProps = (theme: MantineTheme) => ({
    body: {
      ".form": {
        position: "relative"
      },
    
      minHeight: "90vh",
      padding: "0px"
      
    },
    content: {
      background: theme.colors["neutrals-01"][1],
    },
    header: {
      padding: "0px",
    },
    title: {
      width: "100%",
    }
  });
  return styles;
};

export const existingNote = (theme: MantineTheme) => css`
padding:24px 32px;
background-color: ${theme.colors["neutrals-01"][0]};

.deleteNoteBlock{
      position: absolute;
      top:140px;
      left:0;
      width: 100%;
      height: 30%;
      display:flex;
      flex-direction: column;
      gap:16px;
      place-items: center;
      align-items: center;
      justify-content: center;
      background: linear-gradient(to bottom, white, transparent);
      button{
        margin-right: 8px ;
      }
    }
`;
export const existingNoteActions = (theme: MantineTheme) => css`
   background: ${theme.colors["neutrals-01"][0]};
   margin-bottom: 24px;
   button{
        margin-right: 8px;
    }
    svg{
        margin-right: 8px;
    }

   
`;
