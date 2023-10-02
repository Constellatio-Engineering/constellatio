import { UnknownMantineStylesParams } from "@/utils/types";
import { css } from "@emotion/react";
import { ModalStylesNames, Styles } from "@mantine/core";

type ModalStyles = Styles<ModalStylesNames, UnknownMantineStylesParams>;

export const modalStyles = (): ModalStyles => 
{
  const styles: ModalStyles = () => ({
    content:{
        minWidth: "70vw",
        img: {
            objectFit: "contain",
            width: "100%",
            height: "100%", 
        }
    },
    body: {
        maxHeight: "100%",
    },
    header:{
        display: "none",
    },
    root: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
    }
  })
return styles
}



export const wrapper = css`
min-width: 600px;
height: 100vh;
overflow: visible;
`;
