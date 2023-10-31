import { type UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import { type ModalStylesNames, type Styles } from "@mantine/core";

type ModalStyles = Styles<ModalStylesNames, UnknownMantineStylesParams>;

export const modalStyles = ({ extension }: {extension?: string | null}): ModalStyles => 
{
  const styles: ModalStyles = () => ({
    body: {
      padding: "0",
    },
    content: {
      background: extension === "img" ? "transparent" : "black",
      boxShadow: "none",
      minWidth: extension === "img" ? "min-content" : "80vw",
      width: extension === "img" ? "100%" : "max-content"
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
  max-width: 100%;
}
embed,iframe{
  width: 100%;
  height: 86vh;
  object-fit: contain;
}
`;
