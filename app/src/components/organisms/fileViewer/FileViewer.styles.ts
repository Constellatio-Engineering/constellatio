import { type UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import { type ModalStylesNames, type Styles } from "@mantine/core";

type ModalStyles = Styles<ModalStylesNames, UnknownMantineStylesParams>;

export const modalStyles = (): ModalStyles => 
{
  const styles: ModalStyles = () => ({
    body: {
      maxHeight: "100%",
    },
    content: {
      img: {
        height: "100%",
        objectFit: "contain",
        width: "100%", 
      },
      minWidth: "70vw"
    },
    header: {
      display: "none",
    },
    root: {
      height: "100%",
      overflow: "hidden",
      position: "relative",
      width: "100%",
    }
  });
  return styles;
};

export const wrapper = css`
min-width: 600px;
min-height: 50vh;

img{
  width: 100%;
  height: 100%;
  margin:0 auto;
  object-fit: contain;
}
embed,iframe{
  width: 100%;
  height: 86vh;
  object-fit: contain;
}
`;
