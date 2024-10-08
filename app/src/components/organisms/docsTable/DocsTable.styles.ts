/* eslint-disable max-lines */
import { colooors } from "@/constants/styles/colors";
import { type UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import { type ModalStylesNames } from "@mantine/core";
import { type Styles } from "@mantine/styles";

export const wrapper = css`
  display: flex;
  flex-direction: column;
  position: relative;
  `;

const CSSClickableEffect = () => css`
 &:hover{
   background-color: ${colooors["neutrals-01"][1]};        
  }
  `;

export const tableWrapper = () => css`
  text-align: left;
  border-radius: 12px;
  border-collapse: collapse;
  outline: 1px solid ${colooors["neutrals-01"][3]};
  width: 100%;
  thead{
    background: ${colooors["neutrals-01"][2]};
  }
  td {
    padding: 16px;
  }
  th {
    padding: 8px 16px;
    color: ${colooors["neutrals-01"][7]};
    &:first-of-type{
      border-collapse: collapse;
      border-radius: 12px 0px 0 0;
    }
    &:last-of-type{
      border-collapse: collapse;
      border-radius: 0px 12px 0 0px;
    }
  }
  th,
  td {
  
    width: max-content;
    vertical-align: middle;
    white-space: nowrap;
  }
  .primaryCell {
    width: 100%;
    cursor: pointer;
  }
  .label{
    svg{
      vertical-align: text-bottom;
      margin-right: 8px;
    }
  }
`;

export const tableBody = () => css`

  tr{
    td{
      transition: all 300ms ease-in-out;
      *{
        transition: all 300ms ease-in-out;
      }
    }
    &:hover {
      td {
        transition: all 300ms ease-in-out;
        background-color: ${colooors["neutrals-01"][2]};
       > button{
          background-color: ${colooors["neutrals-01"][2]};
          transition: all 300ms ease-in-out;
        }
      }
    }
  }
`;

export const callToActionCell = () => css`
background-color: transparent;
border:0;
outline:0;
cursor: pointer;
position:relative;
min-width: 50px;
display: grid;
place-items: center;
min-height: 55px;
.dots-btn {
  position:absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  border: 0;
  outline: 0;
  ${CSSClickableEffect()};

}
.mantine-Menu-dropdown {
  padding: 0;
}
.mantine-Menu-item {
  border-bottom: 1px solid ${colooors["neutrals-01"][3]};
  border-radius:0px;
}
`;

export const cellFolder = () => css`
	color: ${colooors["neutrals-01"][9]};
	svg {
		vertical-align: text-bottom;
		margin-right: 8px;
	}
`;

export const docName = () => css`
  color: ${colooors["neutrals-02"][1]};
  ${CSSClickableEffect()};
`;
export const docDate = () => css`
  color: ${colooors["neutrals-01"][7]};
`;
export const docTags = () => css`
  color: ${colooors["neutrals-01"][9]};
  
`;

export const showMoreButton = () => css`
  position: absolute;
  background: red;
  display: grid;
  place-items: center;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background: linear-gradient(
    to bottom,
    transparent,
    ${colooors["neutrals-01"][0]}
  );
`;

type ModalStyles = Styles<ModalStylesNames, UnknownMantineStylesParams>;

export const deleteModalStyle = (): ModalStyles => 
{
  const styles: ModalStyles = () => ({
    body: {
      ".delete-folder-text": {
        marginTop: "16px",
      },
      ".modal-call-to-action": {
        alignItems: "center",
        button: {
          flex: 1,
        },
        display: "flex",
        gap: "4px",
        justifyContent: "center",
        marginTop: "24px",
      },
      ".new-folder-input": {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        marginTop: "24px",
      },
      padding: "36px",
    },
    content: {
      ".close-btn": {
        cursor: "pointer",
        position: "absolute",
        right: "24px",
        top: "24px",
      },
      borderRadius: "12px",
      position: "relative",
    },
    header: {
      padddingTop: "36px",
      padding: 0,
    },
    root: {
      minWidth: "520px",
    },
  }); return styles;
};
    
export const MoveToModal = (): ModalStyles => 
{
  const styles: ModalStyles = () => ({
    body: {
      ".delete-folder-text": {
        marginTop: "16px",
      },
      ".modal-call-to-action": {
        alignItems: "center",
        button: {
          flex: 1,
        },
        display: "flex",
        gap: "4px",
        justifyContent: "center",
        marginTop: "24px",
      },
      ".new-folder-input": {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        marginTop: "24px",
      },
      padding: "36px",
    },
    content: {
      ".close-btn": {
        cursor: "pointer",
        position: "absolute",
        right: "24px",
        top: "24px",
      },
      borderRadius: "12px",
      position: "relative",
    },
    header: {
      padddingTop: "36px",
      padding: 0,
    },
    root: {
      minWidth: "520px",
    },
  }); return styles;
};
    
