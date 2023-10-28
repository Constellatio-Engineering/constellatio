import { type UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import { type ModalStylesNames } from "@mantine/core";
import { type Styles, type MantineTheme } from "@mantine/styles";

export const wrapper = css`
    width: 100%;
`;
export const selectedFolder = css`
display: flex;
justify-content: space-between;
align-items: center;
.mantine-Menu-dropdown{
    padding:0;
    padding-top: 6px;
    border-radius: 12px !important;
overflow: hidden;
}
.folder-options{
    button{
        margin-left: 8px;
    }
}
.mantine-Text-root{
    .dots{
        display: grid;
        place-items: center;    
    }
}
`;
export const title = css`
display: flex;
justify-content: space-between;
align-items: center;
gap: 8px;
cursor: pointer;

`;
export const foldersItem = (theme: MantineTheme) => css`
padding: 12px 16px;
border-bottom: 1px solid ${theme.colors["neutrals-01"][3]};
&:last-of-type{
    border:0;
}
&:hover{
    background-color: ${theme.colors["neutrals-01"][1]};
    cursor: pointer;
}
`;
export const createButton = css`
padding:24px 16px;
`;

type ModalStyles = Styles<ModalStylesNames, UnknownMantineStylesParams>;

export const modalStyles = (): ModalStyles => 
{
  const styles: ModalStyles = () => ({
    body: {
      ".modal-call-to-action": {
        alignItems: "center",
        button: {
          flex: 1
        },
        display: "flex",
        gap: "4px",
        justifyContent: "center",
      },
      ".new-folder-input": {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        marginBlock: "24px",
      },
      padding: "36px"
    }
    ,
    content: {
      ".close-btn": {
        cursor: "pointer",
        position: "absolute",
        right: "24px",
        top: "24px",
      },
      borderRadius: "12px",
      position: "relative"
    },
    header: {
      padddingTop: "36px",
      padding: 0,
    },
  }); return styles;
};
    
