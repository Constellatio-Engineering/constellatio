import { type UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import { type ModalStylesNames, type Styles } from "@mantine/core";

type ModalStyles = Styles<ModalStylesNames, UnknownMantineStylesParams>;

export const modalStyles = ({ extensionState }: {extensionState: string | null}): ModalStyles => 
{
  const styles: ModalStyles = () => ({
    body: {
      padding: extensionState === "pdf" ? "0px" : "auto",  
    },
    
    content: {
      boxShadow: "none",
      minWidth: extensionState !== "img" ? "90vw" : "max-content",
    },
    root: {
      overflow: "hidden",
    }
  });
  return styles;
};

export const wrapper = css`
display: flex;
align-items: center;
justify-content: center;
img{
  margin: 0 auto;
  display:block;
  object-fit: contain;
  max-width: 100%;
  max-height: 86vh;
  height: 100% !important;
  width: 100%;
}
embed,iframe{
  width: 100%;
  height: 90vh;
  object-fit: contain;
}
`;
