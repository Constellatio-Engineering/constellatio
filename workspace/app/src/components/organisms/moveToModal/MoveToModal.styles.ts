import { colooors } from "@/constants/styles/colors";
import { type UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import { type ModalStylesNames, type Styles } from "@mantine/core";

type ModalStyles = Styles<ModalStylesNames, UnknownMantineStylesParams>;

export const modal = (): ModalStyles => 
{
  const styles: ModalStyles = () => ({
   
  });
  return styles;
};

export const item = ({ selected }: {selected?: boolean}) => css`
  border-block: 1px solid ${colooors["neutrals-01"][3]};
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 36px;
  height: 60px;
  gap:16px;
  &:hover {
      background-color: ${colooors["neutrals-01"][1]};
  }
  label{
      cursor: pointer;
  }
  ${selected && `background: ${colooors["neutrals-01"][1]};`}
`;

export const callToAction = css`
  padding: 24px 36px 36px 36px;
  display: flex;
  gap:10px;
  align-items: center;
  justify-content: center;
  button{
    flex:1;
  }
`;
