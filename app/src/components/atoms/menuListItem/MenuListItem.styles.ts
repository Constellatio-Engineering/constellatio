import { type UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import { type ModalStylesNames } from "@mantine/core";
import { type Styles, type MantineTheme } from "@mantine/styles";

const CSSActiveStyles = (theme: MantineTheme) => css`
  background-color: ${theme.colors["neutrals-01"][3]};
  border-left: 3px solid ${theme.colors["neutrals-02"][1]};
  p {
    svg {
      color: ${theme.colors["neutrals-02"][1]};
    }
  }
`;

export const wrapper = ({ active, theme }: {
  active?: boolean;
  theme: MantineTheme;
}) => css`
  border: 0;
  outline: 0;
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid ${theme.colors["neutrals-01"][3]};
  width: 100%;
  text-align: left;

  background-color: ${theme.colors["neutrals-01"][0]};
  &:hover {
    background-color: ${theme.colors["neutrals-01"][2]};
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
      color: ${theme.colors["neutrals-01"][9]};
    }
  }
  .mantine-Menu-item{
    padding:0;
  }
  .mantine-Menu-dropdown {
    padding: 0;
    border-radius: 12px;
  }
  .mantine-Menu-itemLabel{
    padding:0;
    margin:0;
    border-bottom: 1px solid ${theme.colors["neutrals-01"][3]};
  }
  ${active && CSSActiveStyles(theme)}
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

export const label = (theme: MantineTheme) => css`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  svg {
    margin-right: 8px;
    vertical-align: bottom;
    color: ${theme.colors["neutrals-01"][7]};
  }
`;

export const dropDownLabel = (theme: MantineTheme) => css`
${label(theme)};
padding:12px 16px;


`;
