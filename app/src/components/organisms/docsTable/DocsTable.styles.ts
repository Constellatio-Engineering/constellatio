/* eslint-disable max-lines */
import { type UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import { type ModalStylesNames } from "@mantine/core";
import { type Styles, type MantineTheme } from "@mantine/styles";

export const wrapper = css`
  display: flex;
  flex-direction: column;
  position: relative;
  /* border-radius: 12px; */
  `;

const CSSClickableEffect = (theme: MantineTheme) => css`
 &:hover{
   background-color: ${theme.colors["neutrals-01"][1]};        
  }
  `;

export const tableWrapper = (theme: MantineTheme) => css`
  text-align: left;
  border-radius: 12px;
  /* overflow: hidden; */
  width: 100%;
  outline: 1px solid ${theme.colors["neutrals-01"][3]};
  /* outline:2px solid red; */border-radius: 12px;
  thead{
    border-radius: 12px 12px  0 0;
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
  .primaryCell {
    width: 100%;
    cursor: pointer;
  }
  tr{
    border-top: 1px solid ${theme.colors["neutrals-01"][3]};
  }
  .label{
    svg{
      vertical-align: text-bottom;
      margin-right: 8px;
    }
  }
`;

export const tableHead = (theme: MantineTheme) => css`
  background-color: #f6f6f5;
  color: ${theme.colors["neutrals-01"][7]};
  border-radius: 12px;
`;

export const tableBody = (theme: MantineTheme) => css`
  background: ${theme.colors["neutrals-01"][0]};
`;

export const callToActionCell = (theme: MantineTheme) => css`
background-color: transparent;
border:0;
outline:0;
cursor: pointer;
${CSSClickableEffect(theme)};
position:relative;
.dots-btn {
  position:absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  border: 0;
  outline: 0;
  ${CSSClickableEffect(theme)};

}
.mantine-Menu-dropdown {
  padding: 0;
  border-radius: 12px;
}
.mantine-Menu-item {
  border-bottom: 1px solid ${theme.colors["neutrals-01"][3]};
  border-radius:0px;
}
`;

export const docName = (theme: MantineTheme) => css`
  color: ${theme.colors["neutrals-02"][1]};
  ${CSSClickableEffect(theme)};
`;
export const docDate = (theme: MantineTheme) => css`
  color: ${theme.colors["neutrals-01"][7]};
`;
export const docTags = (theme: MantineTheme) => css`
  color: ${theme.colors["neutrals-01"][9]};
  
`;

export const showMoreButton = (theme: MantineTheme) => css`
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
    ${theme.colors["neutrals-01"][0]}
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
    
