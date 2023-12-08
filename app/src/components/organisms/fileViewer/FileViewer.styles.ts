import { type FileType } from "@/components/organisms/fileViewer/FileViewer";
import { type UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import { type ModalStylesNames, type Styles } from "@mantine/core";

type ModalStyles = Styles<ModalStylesNames, UnknownMantineStylesParams>;

export const modalStyles = ({ fileType }: { fileType: FileType }): ModalStyles =>
{
  const styles: ModalStyles = () => ({
    body: {
      maxWidth: "90vw",
      padding: fileType === "pdf" ? "0px" : "auto",
    },
    content: {
      boxShadow: "none",
      minWidth: fileType !== "image" ? "70vw" : "max-content"
    },
    root: {
      overflow: "hidden",
    }
  });
  return styles;
};

export const loadingWrapper = css`
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const wrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  img {
    margin: 0 auto;
    display: block;
    object-fit: contain;
    max-width: 100%;
    max-height: 86vh;
    height: auto;
    width: auto;
  }

  embed, iframe {
    width: 100%;
    height: 88vh;
    object-fit: contain;
  }
`;

export const wrapperLoading = css`
  min-height: 50vh;
`;

export const header = css`
  position: fixed;
  display: flex;
  padding: 4px 20px;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999999;
  background-color: #0e0e0e;
  color: #ededed;
`;
