import { colooors } from "@/constants/styles/colors";
import { type UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import { type ModalStylesNames, type Styles, } from "@mantine/core";

type ModalStyles = Styles<ModalStylesNames, UnknownMantineStylesParams>;

export const modalStyles = (): ModalStyles => 
{
  const styles: ModalStyles = () => ({
    body: {
      padding: 0,
    },
    content: {
      borderRadius: 12,
      minWidth: "520px",

      padding: 36,
    },
    header: {
      padding: "0",
      position: "relative",
    },
    title: {
      padding: "0",
      position: "relative",
      width: "100%",
    },
  });
  return styles;
};

export const profilePictureWrapper = css`
  margin-top: 30px;
`;

export const closeButton = css`
  outline: 0;
  border: 0;
  background: transparent;
  position: absolute;
  top: -16px;
  right: -16px;
  svg {
    width: 32px;
    height: 32px;
    color: #000;
  }
`;

export const uploadImgCard = () => css`
  margin-top: 20px;
  margin-bottom: 24px;
  background-color: ${colooors["neutrals-01"][2]};
  border-radius: 12px;
  border: 1px solid ${colooors["neutrals-01"][3]};
  padding: 60px;
  display: grid;
  place-items: center;
  grid-gap: 8px;
  z-index: 2;
  position: relative;
  cursor:   pointer;

`;
export const saveButton = css`
  display: block;
  width: 100%;
`;
export const uploadImgInput = () => css`
  opacity: 0;
  /* input style debugger opacity: 0.3; */
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: red;
  border-radius: 12px;
  cursor:   pointer;
  border: 1px solid ${colooors["neutrals-01"][3]};
  padding: 60px;
  grid-gap: 8px;
  z-index: 3;
`;
export const libraryArea = () => css`
  margin: 24px 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  
  img{
    object-fit:contain;
    border-radius:50%;
    cursor: pointer;
    background-color: ${colooors["neutrals-01"][2]};
    outline: 1px solid ${colooors["neutrals-01"][3]};
    padding: 12px;
    position: relative;
   border: 3px solid ${colooors["neutrals-01"][0]};
   outline: 1px solid ${colooors["neutrals-01"][3]};
  }
  svg{
    background-color: ${colooors["neutrals-01"][2]};
    border-radius: 50%;
    width: 90px;
    height: 90px;
   margin-right: 10px;
   margin-bottom: 10px;
  }
`;
export const avatarIcon = ({ selected }: {selected?: boolean }) => css`
svg{
  border: 3px solid ${selected ? colooors["neutrals-01"][0] : colooors["neutrals-01"][0]};
  outline: 1px solid ${selected ? colooors["neutrals-02"][1] : colooors["neutrals-01"][3]};
}
`;
