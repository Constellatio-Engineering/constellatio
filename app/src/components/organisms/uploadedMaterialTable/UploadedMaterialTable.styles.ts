import { type UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import { type DrawerStylesNames } from "@mantine/core";
import { type Styles, type MantineTheme } from "@mantine/styles";

export const tableWrapper = (theme: MantineTheme) => css`
  text-align: left;
  border-radius: 12px;
  overflow: hidden;
  outline: 1px solid ${theme.colors["neutrals-01"][1]};
  .mantine-Menu-dropdown {
    padding: 0;
    border-radius: 12px; 
  }
  .mantine-Menu-item {
    border-bottom: 1px solid ${theme.colors["neutrals-01"][3]};
    border-radius:0px; 

  }
  td {
    padding: 16px;
  }
  th {
    padding: 8px 16px;
  }
  th,
  td {
    width: max-content;
    vertical-align: middle;
    white-space: nowrap;
  }
  tr {
    border: 1px solid ${theme.colors["neutrals-01"][2]};
  }
  .primaryCell {
    width: 100%;
    
    p {
      max-width: 550px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      svg{
        vertical-align: text-bottom;
        margin-right: 8px;
      }
      gap: 8px;
    }
  }
`;

export const tableHead = (theme: MantineTheme) => css`
  background-color: #f6f6f5;
  color: ${theme.colors["neutrals-01"][7]};
`;

export const tableBody = (theme: MantineTheme) => css`
  background: ${theme.colors["neutrals-01"][0]};

`;

export const callToActionCell = css``;
export const docName = (theme: MantineTheme) => css`
  color: ${theme.colors["neutrals-02"][1]};
  cursor: pointer;
  
`;
export const docDate = (theme: MantineTheme) => css`
  color: ${theme.colors["neutrals-01"][7]};
`;
export const docTags = (theme: MantineTheme) => css`
  color: ${theme.colors["neutrals-01"][9]};
`;
export const cellNote = (theme: MantineTheme) => css`
  color: ${theme.colors["neutrals-01"][9]};
  cursor: pointer;
  svg{
    vertical-align: text-bottom;
    margin-right: 8px;
  }
`;

export const showMoreButton = (theme: MantineTheme) => css`
  position: relative;
  background: red;
  display: grid;
  place-items: center;
  bottom: 45px;
  left: 0;
  width: 100%;
  padding: 10px;
  background: linear-gradient(
    to top,
    ${theme.colors["neutrals-01"][0]} 40%,
    transparent 100%
  );
`;

type DrawerStylesProps = Styles<DrawerStylesNames, UnknownMantineStylesParams>;

export const drawerStyles = () => 
{
  const styles: DrawerStylesProps = (theme: MantineTheme) => ({
    body: {
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
