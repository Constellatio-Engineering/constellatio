import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

type SearchFieldSmallStylesProps = {
  searchValue?: string;
  size?: "small" | "normal";
  theme: MantineTheme;
};

export const wrapper = ({ searchValue, size, theme }: SearchFieldSmallStylesProps) => css`
	.mantine-TextInput {
		&-root {
		}

		&-wrapper {
			padding: 0;
		}

		&-icon {
			${searchValue &&
			css`
				color: ${theme.colors["neutrals-02"][2]};
			`}

			${size === "small" &&
			css`
				width: 16px;
				height: 16px;
			`}

      top: ${size === "small" ? "10px" : "16px"};
			left: ${size === "small" ? "10px" : "16px"};
      cursor: pointer;
		}

		&-input {
			padding-left: ${size === "small" ? "26px" : "43px"};
      padding-right: ${size === "small" ? "26px" : "43px"};
			height: ${size === "small" ? "32px" : "48px"};
			border-radius: ${size === "small" ? "500px" : "8px"};
		}

		&-rightSection {
			${size === "small" &&
			css`
				width: 16px;
				height: 16px;
			`}

			visibility: ${searchValue ? "visible" : "hidden"};
			top: ${size === "small" ? "10px" : "16px"};
			right: ${size === "small" ? "10px" : "16px"};
			background-color: ${theme.colors["neutrals-01"][0]};
      cursor: pointer;
		}
	}
`;

export const icon = css`
	width: inherit;
	height: inherit;
`;
