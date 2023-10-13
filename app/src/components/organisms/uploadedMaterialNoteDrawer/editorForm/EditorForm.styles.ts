import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const MaterialNoteRichText = css`
  margin: 24px 32px;
`;

export const MaterialNotesCallToAction = (theme: MantineTheme) => css`
position: absolute;
bottom: 0;
left: 0;
width: 100%;
display:flex;
justify-content: center;
align-items: center;
padding:32px;
gap:12px;
background: ${theme.colors["neutrals-01"][0]};
border-top: 1px solid ${theme.colors["neutrals-01"][3]};
button{
  flex:1;
}
`;

export const wrapper = css`
.mantine-Drawer-body {
    /* padding:0; */
    background-color: white;
}

`;
export const existingNoteActions = (theme: MantineTheme) => css`
   background: ${theme.colors["neutrals-01"][1]};
   margin-bottom: 24px;
   button{
        margin-right: 8px;
    }
    svg{
        margin-right: 8px;
    }
`;

export const existingNote = (theme: MantineTheme) => css`
padding:24px 32px;
background-color: ${theme.colors["neutrals-01"][1]};
`;
