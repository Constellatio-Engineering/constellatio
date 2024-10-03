import { colooors } from "@/constants/styles/colors";
import { type UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import { type DrawerStylesNames } from "@mantine/core";
import { type Styles } from "@mantine/styles";

export const tableWrapper = () => css`
  text-align: left;
  border-radius: 12px;
  overflow: hidden;
  outline: 1px solid ${colooors["neutrals-01"][3]};
  .mantine-Menu-dropdown {
    padding: 0;
    border-radius: 12px; 
  }
  .mantine-Menu-item {
    border-bottom: 1px solid ${colooors["neutrals-01"][3]};
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
    border: 1px solid ${colooors["neutrals-01"][3]};
    td{
      transition: all 300ms ease-in-out;
      *{
        transition: all 300ms ease-in-out;
      }
    }
    &:hover {
      td {
        transition: all 300ms ease-in-out;
        background-color: ${colooors["neutrals-01"][3]};
       > button{
          background-color: ${colooors["neutrals-01"][3]};
          transition: all 300ms ease-in-out;
        }
      }
    }
    }
   
  .primaryCell {
    width: 100%;
    cursor: pointer;
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

export const tableHead = () => css`
  background-color: #f6f6f5;
  color: ${colooors["neutrals-01"][7]};
`;

export const tableBody = () => css`
  background: ${colooors["neutrals-01"][0]};

`;

export const callToActionCell = css``;
export const docName = () => css`
  color: ${colooors["neutrals-02"][1]};
  cursor: pointer;
  
`;
export const docDate = () => css`
  color: ${colooors["neutrals-01"][7]};
`;
export const docTags = () => css`
  color: ${colooors["neutrals-01"][9]};
`;
export const cellNote = () => css`
  color: ${colooors["neutrals-01"][9]};
  cursor: pointer;
  svg{
    vertical-align: text-bottom;
    margin-right: 8px;
  }
`;

export const showMoreButton = () => css`
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
    ${colooors["neutrals-01"][0]} 40%,
    transparent 100%
  );
`;

type DrawerStylesProps = Styles<DrawerStylesNames, UnknownMantineStylesParams>;

export const drawerStyles = () => 
{
  const styles: DrawerStylesProps = () => ({
    body: {
      padding: "0px"
    },
    content: {
      background: colooors["neutrals-01"][1],
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

export const MaterialNotesCallToAction = () => css`
position: absolute;
bottom: 0;
left: 0;
width: 100%;
display:flex;
justify-content: center;
align-items: center;
padding:32px;
gap:12px;
background: ${colooors["neutrals-01"][0]};
border-top: 1px solid ${colooors["neutrals-01"][3]};
button{
  flex:1;
}
`;
