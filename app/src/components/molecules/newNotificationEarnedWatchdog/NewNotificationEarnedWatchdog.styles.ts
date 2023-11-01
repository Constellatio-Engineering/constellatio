import { type UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import { type Styles, type ModalStylesNames, type MantineTheme } from "@mantine/core";

const imageSize = 180;

export const contentWrapper = css`
  display:grid;
  place-items: center;
`;

export const imageWrapper = css`
  position: relative;
  width: ${imageSize}px;
  height: ${imageSize}px;
  margin-bottom: 16px;
  `;

export const image = css`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

type ModalStyles = Styles<ModalStylesNames, UnknownMantineStylesParams>;

export const newEarnedModalStyle = (): ModalStyles => 
{
  const styles: ModalStyles = (_theme) => ({
    body: {
      display: "grid",
      padding: "32px",
      placeItems: "center",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
  });
  return styles;
};

export const customModalHeader = (theme: MantineTheme) => css`
  text-align: center;
  color: ${theme.colors["neutrals-02"][1]};
  padding: 24px 0;
  svg {
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
  }
`;
