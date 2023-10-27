
import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";
export const wrapper = css`
.mantine-Drawer-body {
    /* padding:0; */
    background-color: white;
}

`;
export const existingNoteActions = (theme: MantineTheme) => css`
   background: ${theme.colors["neutrals-01"][0]};
padding: 24px;
   width: 100%;
   button{
        margin-right: 8px;
    }
    svg{
        margin-right: 8px;
    }
`;

export const existingNote = (theme: MantineTheme) => css`
/* padding:24px 32px; */
background-color: ${theme.colors["neutrals-01"][1]};
position: relative;
`;
export const docContent = (theme: MantineTheme) => css`
background: ${theme.colors["neutrals-01"][0]};
padding: 24px;
min-height: calc(100vh - 255px);
blockquote {
    padding:20px;
    background: ${theme.colors["neutrals-01"][1]};
    border: 1px solid ${theme.colors["neutrals-01"][3]};
    border-radius: 12px;
    margin: 24px 0;
    &::before{
      background-image: url("/images/icons/quote-icon.svg");
      background-repeat: no-repeat;
      content: "";
      display: block;
      height: 20px;
      width: 20px;
    }
  }
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
