import { type UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import { type DrawerStylesNames } from "@mantine/core";
import { type MantineTheme, type Styles } from "@mantine/styles";

type DrawerStylesProps = Styles<DrawerStylesNames, UnknownMantineStylesParams>;

export const drawerStyles = () => 
{
  const styles: DrawerStylesProps = (theme: MantineTheme) => ({
    body: {
      display: "flex",
    },

    content: {
      ".suggestion__section": {
        "&__link": {
          alignItems: "center",
          display: "flex",
          gap: "8px",
          paddingLeft: "4px",
        },

        alignItems: "flex-start",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      },

      backgroundColor: theme.colors["neutrals-01"][0],
      boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.05)",
      height: "auto !important",
      minHeight: "450px",
    },

    title: {
      width: "100%",
    },
  });

  return styles;
};

export const suggestionsLeft = ({ hasInput, hasNoResults }: {
  hasInput: boolean;
  hasNoResults: boolean;
}) => css`
	width: 61%;
	min-height: 100%;
	display: flex;
	flex-direction: column;
	padding: 40px 0 60px 60px;
	gap: 40px;

	${hasInput &&
	hasNoResults &&
	css`
		margin: 0 auto;
		width: 100%;
	`}

	.emptyStateCard {
		display: flex;
		justify-content: center;
		height: 100%;

		> div {
			background-color: transparent;

			> div {
				height: 100%;
			}
		}
	}

	.suggestion__section {
		&__link {
			> p {
				font-size: 18px;
				font-weight: 400;
				line-height: 28px;
				max-width: 580px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
`;

export const suggestionsRight = (theme: MantineTheme) => css`
	width: 39%;
	display: flex;
	flex-direction: column;
	padding: 40px 60px;
	gap: 52px;
	min-height: 100%;
	border-left: 1px solid ${theme.colors["neutrals-01"][3]};

	.suggestion__section {
		&__link {
			> p {
				font-family: ${theme.fontFamily};
				font-size: 16px;
				font-weight: 500;
				line-height: 24px;
			}
		}
	}

	.popularCategories {
		display: flex;
		flex-direction: column;
		gap: 12px;
		align-self: stretch;
	}
`;
