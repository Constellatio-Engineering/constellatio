/* eslint-disable max-lines */
import { colooors } from "@/constants/styles/colors";
import { type UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import { type DrawerStylesNames, type ModalStylesNames } from "@mantine/core";
import { type Styles } from "@mantine/styles";

const CSSClickableEffect = () => css`
	&:hover {
		background: ${colooors["neutrals-01"][1]};
	}
`;

export const tableWrapper = () => css`
	text-align: left;
	border-radius: 12px;
	overflow: hidden;
	outline: 1px solid ${colooors["neutrals-01"][1]};
	td {
		padding: 16px;
	}
	th {
		padding: 8px 16px;
	}
	th,
	td {
		width: max-content;
		vertical-align: middle;
		white-space: nowrap;
	}
	tr {
		border: 1px solid ${colooors["neutrals-01"][2]};
		width:100%;
	}
	
	.primaryCell {
		width: 100%;

		p {
			max-width: 550px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			svg {
				vertical-align: text-bottom;
				margin-right: 8px;
			}
			gap: 8px;
		}
	}
	.mantine-Menu-dropdown {
		padding: 0;
		border-radius: 12px;
	}
	.mantine-Menu-item {
		border-bottom: 1px solid ${colooors["neutrals-01"][3]};
		border-radius: 0px;
	}
`;

export const tableHead = () => css`
	background-color: #f6f6f5;
	color: ${colooors["neutrals-01"][7]};
`;

export const tableBody = () => css`
	background: ${colooors["neutrals-01"][0]};
`;

export const callToActionCell = () => css`
	background-color: transparent;
	border: 0;
	outline: 0;
	svg {
		vertical-align: text-bottom;
		margin-right: 8px;
	}
	${CSSClickableEffect()}
	button {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-color: transparent;
		border: 0;
		outline: 0;
		${CSSClickableEffect()}
		padding-left: 5px;
		svg {
			display: grid;
			place-items: center;
		}
	}
	position: relative;
`;
export const docName = ({ clickable }: {
  clickable?: boolean;
}) => css`
	color: ${colooors["neutrals-02"][1]};
	${clickable && CSSClickableEffect()}
`;
export const docDate = () => css`
	color: ${colooors["neutrals-01"][7]};
`;
export const docTags = () => css`
	color: ${colooors["neutrals-01"][9]};
`;
export const cellNote = () => css`
	color: ${colooors["neutrals-01"][9]};
	cursor: pointer;
	svg {
		vertical-align: text-bottom;
		margin-right: 8px;
	}
	${CSSClickableEffect()}
`;

export const cellFolder = () => css`
	color: ${colooors["neutrals-01"][9]};
	svg {
		vertical-align: text-bottom;
		margin-right: 8px;
	}
`;

export const showMoreButton = () => css`
	position: relative;
	background: red;
	display: grid;
	place-items: center;
	bottom: 45px;
	left: 0;
	width: 100%;
	padding: 10px;
	background: linear-gradient(
		to top,
		${colooors["neutrals-01"][0]} 40%,
		transparent 100%
	);
`;

type DrawerStylesProps = Styles<DrawerStylesNames, UnknownMantineStylesParams>;

export const drawerStyles = () => 
{
  const styles: DrawerStylesProps = () => ({
    body: {
      padding: "0px",
    },
    content: {
      background: colooors["neutrals-01"][1],
    },
    header: {
      padding: "0px",
    },
    title: {
      width: "100%",
    },
  });
  return styles;
};

export const MaterialNoteRichText = css`
	margin: 24px 32px;
`;

export const MaterialNotesCallToAction = () => css`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 32px;
	gap: 12px;
	background: ${colooors["neutrals-01"][0]};
	border-top: 1px solid ${colooors["neutrals-01"][3]};
	button {
		flex: 1;
	}
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

export const label = () => css`
	display: inline-block;
	overflow: hidden;
	white-space: nowrap;
	width: 100%;
	text-overflow: ellipsis;
	svg {
		margin-right: 8px;
		vertical-align: bottom;
		color: ${colooors["neutrals-01"][7]};
	}
`;

export const dropDownLabel = () => css`
	${label()};
	padding: 12px 16px;
`;
