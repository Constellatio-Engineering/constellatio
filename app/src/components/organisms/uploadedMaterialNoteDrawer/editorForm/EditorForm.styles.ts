
import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";
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
