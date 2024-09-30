import { colooors } from "@/constants/styles/colors";
import { type UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import { type ModalStylesNames } from "@mantine/core";
import { type Styles } from "@mantine/styles";

const CSSActiveStyles = ({ active }: {active?: boolean }) => css`
  background-color: ${colooors["neutrals-01"][3]};
  border-left: 3px solid ${colooors["neutrals-02"][1]};
  p {
    svg {
      color: ${active ? colooors["neutrals-02"][1] : colooors["neutrals-01"][7]};
    }
  }
`;

export const wrapper = ({ active }: {
  active?: boolean;
}) => css`
  border: 0;
  outline: 0;
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid ${colooors["neutrals-01"][3]};
  width: 100%;
  text-align: left;

  background-color: ${colooors["neutrals-01"][0]};
  &:hover {
    background-color: ${colooors["neutrals-01"][2]};
  }
  p {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .label {
    }
    svg {
      min-width: 24px;
      min-height: 24px;
      color: ${colooors["neutrals-01"][9]};
    }
  }
  .mantine-Menu-item{
    /* padding:0; */
    border-bottom: 1px solid ${colooors["neutrals-01"][3]};
    
  }
  .mantine-Menu-dropdown {
    padding: 0;
    border-radius: 12px;
  }
  .mantine-Menu-itemLabel{
    /* padding:0;
    margin:0; */
  }
  ${active && CSSActiveStyles({ active })}
`;

type ModalStyles = Styles<ModalStylesNames, UnknownMantineStylesParams>;

export const modalStyles = (): ModalStyles => 
{
  const styles: ModalStyles = () => ({
    body: {
      ".delete-folder-text": {
        marginTop: "16px",
      },
      ".modal-call-to-action": {
        alignItems: "center",
        button: {
          flex: 1,
        },
        display: "flex",
        gap: "4px",
        justifyContent: "center",
        marginTop: "24px",
      },
      ".new-folder-input": {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        marginTop: "24px",
      },
      padding: "36px",
    },
    content: {
      ".close-btn": {
        cursor: "pointer",
        position: "absolute",
        right: "24px",
        top: "24px",
      },
      borderRadius: "12px",
      position: "relative",
    },
    header: {
      padddingTop: "36px",
      padding: 0,
    },
    root: {
      minWidth: "520px",
    },
  });
  return styles;
};

export const label = ({ active }: {active?: boolean}) => css`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  color:${active ? colooors["neutrals-02"][1] : colooors["neutrals-01"][9]};
  svg {
    margin-right: 8px;
    vertical-align: bottom;
    color:${active ? colooors["neutrals-02"][1] : colooors["neutrals-01"][7]};
  }
`;

export const dropDownLabel = () => css`
${label({ active: false })};
padding:12px 16px;
`;
