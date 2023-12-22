
import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";
export const wrapper = css`
.mantine-Drawer-body {
    /* padding:0; */
    background-color: white;
}

`;

export const existingNote = () => css`
  padding:24px 32px; 
  background-color: #ffffff;
  position: relative;
  height: 100%;
`;

export const existingNoteActions = (theme: MantineTheme) => css`
   background: ${theme.colors["neutrals-01"][0]};
   width: 100%;
  margin-bottom: 24px;
   button{
        margin-right: 8px;
    }
    svg{
        margin-right: 8px;
    }
`;

export const contentWrapper = css`
`;

export const deleteDocWindow = css`
  position: absolute;
  top:82px;
  left:0;
  width: 100%;
  height: 100%;
  display:flex;
  flex-direction: column;
  gap:16px;
  place-items: center;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, white 50%, transparent 100%);
  button{
    margin-right: 8px ;
  }
`;

export const createDocForm = css`
  padding: 24px;
`;
