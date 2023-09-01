import { type SerializedStyles, css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

import { type IColumnHeaderProps } from "./ColumnHeader";

export const wrapper = ({
  dataSorted,
  doesSort,
  theme,
}: {
  dataSorted: boolean;
  doesSort: IColumnHeaderProps["doesSort"];
  theme: MantineTheme;
}): SerializedStyles => css`
	width: 100%;
	height: 32px;
	cursor: ${doesSort ? "pointer" : "default"};
	display: flex;
	align-items: center;
	padding: 8px 16px;
	gap: 2px;

	border: none;
	outline: none;
	border-bottom: 1px solid ${theme.colors["neutrals-01"][3]};
	background-color: ${theme.colors["neutrals-01"][2]};
	color: ${dataSorted
    ? theme.colors["neutrals-01"][7]
    : theme.colors["neutrals-02"][1]};

	> p {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		text-transform: uppercase;
	}

	> svg {
		width: 16px;
		height: 16px;
		opacity: ${dataSorted ? 1 : 0};
		color: ${dataSorted
    ? theme.colors["neutrals-02"][1]
    : theme.colors["neutrals-01"][7]};
		transition: opacity 0.3s ease-in, color 0.3s ease-in;
	}

	transition: background-color 0.3s ease-in, border-color 0.3s ease-in,
		color 0.3s ease-in;

	&:hover {
		border-color: ${theme.colors["neutrals-01"][4]};
		color: ${theme.colors["neutrals-02"][1]};

		> svg {
			opacity: 1;
			color: ${theme.colors["neutrals-01"][7]};
		}
	}
`;
