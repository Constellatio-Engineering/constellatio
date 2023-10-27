import { type UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import { type ModalStylesNames } from "@mantine/core";
import { type Styles, type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
    background-color: ${theme.colors["neutrals-01"][0]};
    border-radius: 12px;
    box-shadow: 0px 8px 44px 0px rgba(0, 0, 0, 0.04);
    width: 312px;
    height: auto;
    max-height: 400px;
    margin: 0 auto;

  @media screen and (max-width: 1100px) {
    width: 100%;
  }

`;
export const header = (theme: MantineTheme) => css`
    color:${theme.colors["neutrals-02"][1]};
    padding:24px  24px 24px 16px;
`;
export const content = css``;
export const callToAction = (theme: MantineTheme) => css`
    padding:16px 24px;
    background: ${theme.colors["neutrals-01"][0]};
    border-radius: 0 0 12px 12px;
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
    
